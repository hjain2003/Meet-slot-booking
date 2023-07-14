import Meet from "../models/Meet.js";

//addMeet
export const setMeet = async (req, res) => {
    const { title, date, time } = req.body;

    if (!title || !date || !time) {
        return res.status(422).json({ error: "Empty fields!" });
    }

    try {
        const existingMeet = await Meet.findOne({ date, time });

        if (existingMeet) {
            return res.status(422).json({ error: "A meeting with the same date and time already exists!" });
        }

        const meet = new Meet({ title, date, time });
        const meetSet = await meet.save();

        if (meetSet) {
            return res.status(201).json({ message: "Meet set successfully!" });
        } else {
            return res.status(422).json({ error: "Meet setup failed!" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server error!" });
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
    let meets;
    try {
        meets = await Meet.find(); 
    } catch (err) {
        console.log(err);
    }

    if (!meets) {
        res.status(500).json({ error: 'unexpected error' });
    }
    else {
        res.status(200).json({ meets});
    }
};

//deleteMeet
export const deleteMeet = async (req, res) => {
    const meetId = req.params.id;

    try {
        const deletedMeet = await Meet.findByIdAndDelete(meetId);

        if (deletedMeet) {
            return res.status(200).json({ message: "Meet deleted successfully!" });
        } else {
            return res.status(404).json({ error: "Meet not found!" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server error!" });
    }
};

//editMeet
export const editMeet = async (req, res) => {
    const meetId = req.params.id;
    const { title, date, time } = req.body;

    if (!title || !date || !time) {
        return res.status(422).json({ error: "Empty fields!" });
    }

    try {
        const updatedMeet = await Meet.findByIdAndUpdate(
            meetId,
            { title, date, time },
            { new: true }
        );

        if (updatedMeet) {
            return res.status(200).json({ message: "Meet updated successfully!", meet: updatedMeet });
        } else {
            return res.status(404).json({ error: "Meet not found!" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server error!" });
    }
};


