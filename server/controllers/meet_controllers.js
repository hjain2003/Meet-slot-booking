import Meet from "../models/Meet.js";
import User from "../models/User.js";
import mongoose from 'mongoose';

//addMeet
export const setMeet = async (req, res) => {
  const { title, date, time, user } = req.body;

  if (!title || !date || !time) {
    res.status(422).json({ error: "Fields empty" });
    return; // Return early if there are missing fields
  }

  // Get the user ID from the authenticated user
  const userId = req.rootUser._id;

  try {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      res.status(422).json({ message: "User not found" });
    } else {
      const meetset = new Meet({
        title,
        date,
        time,
        user: userId
      });

      // Create session to save pass in both collections
      const session = await mongoose.startSession(); // Starts a session
      session.startTransaction();

      existingUser.meets.push(meetset); // Pushing to passwords array in user schema
      await existingUser.save({ session }); // Saving user
      const meetAdd = await meetset.save({ session }); // Saving password
      session.commitTransaction(); // Finishing transaction
      if (meetAdd) {
        // Return the name of the user who creates the meet
        res.status(201).json({
          message: "Meet added successfully",
          userName: existingUser.name // Add this line to return the user's name
        });
      } else {
        res.status(422).json({ message: "Meet not added" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unexpected error" });
  }
};


//getMeetbyId
export const getMeetById = async (req, res) => {
    const meetId = req.params.id;

    try {
        const meet = await Meet.findById(meetId);

        if (meet) {
            res.status(200).json(meet);
        } else {
            res.status(404).json({ error: "Meet not found!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error!" });
    }
};

//showMeets
export const getAllMeets=async(req,res)=>{
  try {
    const meets = await Meet.find()
      .populate({
        path: 'user',
        select: 'name', // Include only the 'name' field of the referenced user document
      })
      .sort({ date: 1, time: 1 });

    res.status(200).json({ meets });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unexpected error' });
  }
};

//deleteMeet
export const deleteMeet = async (req, res) => {
    const id = req.params.id;

  try {
    const deletedMeet = await Meet.findByIdAndDelete(id);
    if (deletedMeet) {
      const userId = deletedMeet.user;
      const user = await User.findById(userId);
      if (user) {
        user.meets.pull(id);
        await user.save();
      }
      res.status(200).json({ message: 'Meet deleted successfully' });
    } else {
      res.status(404).json({ error: 'Meet not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Unexpected error' });
  }
};

//editMeet
export const editMeet = async (req, res) => {
    const id = req.params.id;
  const { title, date, time } = req.body;

  if (!title || !date || !time) {
    res.status(422).json({ error: 'Fields are empty' });
  }

  try {
    const updatedMeet = await Meet.findByIdAndUpdate(
      id,
      { title, date, time },
      { new: true }
    );

    if (updatedMeet) {
      res.status(200).json({ message: 'Meet updated successfully' });
    } else {
      res.status(404).json({ error: 'Meet not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Unexpected error' });
  }
};


