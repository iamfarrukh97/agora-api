const dotenv = require("dotenv");
const {
  RtcTokenBuilder,
  RtmTokenBuilder,
  RtcRole,
  RtmRole,
} = require("agora-access-token");
dotenv.config({ path: "./.env" });
const Tour = require("../models/toursModel");
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: { tours },
    });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error });
  }
};
exports.createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    res.status(200).json({
      status: "success",
      data: tour,
    });
  } catch (error) {
    res.status(200).json({
      status: "fail",
      message: error,
    });
  }
};
exports.createChannel = async (req, res) => {
  try {
    const { _id, tourName } = req.body;
    const appId = process.env.appId;
    const appCertificate = process.env.appCertificate;
    const channelName = tourName;
    const uid = _id;
    const account = _id;
    const role = RtcRole.PUBLISHER;

    const expirationTimeInSeconds = 3600;

    const currentTimestamp = Math.floor(Date.now() / 1000);

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

    // Build token with uid
    const check = await Tour.findById(_id);
    console.log("check.tourToken ", check.tourToken);

    if (check.tourToken) {
      res
        .status(404)
        .json({ status: "fail", message: "Tour Token Already Exists" });
    }
    const token = RtcTokenBuilder.buildTokenWithUid(
      appId,
      appCertificate,
      channelName,
      uid,
      role,
      privilegeExpiredTs
    );
    console.log("Token With Integer Number Uid: " + token);
    const tour = await Tour.findByIdAndUpdate(
      { _id },
      { tourToken: token },
      {
        new: true,
      }
    );
    console.log("tour ", tour);
    // Build token with user account
    // const tokenB = RtcTokenBuilder.buildTokenWithAccount(
    //   appID,
    //   appCertificate,
    //   channelName,
    //   account,
    //   role,
    //   privilegeExpiredTs
    // )
    // console.log('Token With UserAccount: ' + tokenB)
    // const newTour = await Tour.create(req.body)

    res.status(201).json({
      status: "success",
      data: { tour },
    });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({ status: "success", data: { tour } });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: "success", data: null });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      { $match: { ratingAverage: { $gte: 4.5 } } },
      {
        $group: {
          _id: "$difficulty",
          numTour: { $sum: 1 },
          numRating: { $sum: "$ratingQuantity" },
          avgRating: { $avg: "$ratingAverage" },

          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
      {
        $sort: { avgPrice: -1 },
      },
    ]);
    res.status(200).json({ status: "success", data: { stats } });
  } catch (error) {
    console.log("error ", error);
    res.status(404).json({ status: "fail", message: error });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
      {
        $unwind: "$startDates",
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$startDates" },
          numTourStarts: { $sum: 1 },
          tours: { $push: "$name" },
        },
      },
      {
        $addFields: {
          month: "$_id",
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { numTourStarts: -1 },
      },
      {
        $limit: 12,
      },
    ]);
    res.status(200).json({ status: "success", data: { plan } });
  } catch (error) {
    console.log("error ", error);
    res.status(404).json({ status: "fail", message: error });
  }
};
