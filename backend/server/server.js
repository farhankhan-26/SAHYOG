require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 5000;

// =========================
// SUPABASE CONNECTION
// =========================

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
);

// =========================
// MIDDLEWARE
// =========================

app.use(cors());
app.use(express.json());

// Serve SAHYOG frontend
app.use(express.static(path.join(__dirname, "../../")));

// =========================
// AUTHENTICATION HELPER
// =========================

async function getAuthenticatedUser(req) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return null;
    }

    const token = authHeader.replace("Bearer ", "");

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
        return null;
    }

    return data.user;
}

// =========================
// STATUS
// =========================

app.get("/api/status", (req, res) => {
    res.json({
        success: true,
        message: "SAHYOG backend is running!"
    });
});

// =========================
// SERVICES
// =========================

app.get("/api/services", (req, res) => {
    res.json([
        {
            id: "electrician",
            name: "Electrical Repair",
            price: "₹49+"
        },
        {
            id: "plumber",
            name: "Plumbing",
            price: "₹149+"
        },
        {
            id: "ac",
            name: "AC Service & Repair",
            price: "₹299+"
        },
        {
            id: "cleaning",
            name: "Home Cleaning",
            price: "₹499+"
        },
        {
            id: "carpenter",
            name: "Carpenter",
            price: "₹129+"
        }
    ]);
});

// =========================
// CREATE BOOKING
// =========================

app.post("/api/bookings", async (req, res) => {

    try {

        const user = await getAuthenticatedUser(req);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Please login before booking a service."
            });
        }

        const {
            service,
            date,
            time,
            worker
        } = req.body;

        if (!service || !date || !time || !worker) {
            return res.status(400).json({
                success: false,
                message: "Please provide service, date, time and worker."
            });
        }

        const { data, error } = await supabase
            .from("bookings")
            .insert([
                {
                    customer_id: user.id,
                    service_name: service,
                    worker_name: worker,
                    date: date,
                    time: time,
                    status: "pending"
                }
            ])
            .select()
            .single();

        if (error) {
            console.error("Supabase booking error:", error);

            return res.status(500).json({
                success: false,
                message: "Could not save booking.",
                error: error.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Booking saved successfully!",
            booking: data
        });

    } catch (error) {

        console.error("Booking server error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while creating booking."
        });
    }
});

// =========================
// GET CUSTOMER BOOKINGS
// =========================

app.get("/api/bookings", async (req, res) => {

    try {

        const user = await getAuthenticatedUser(req);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Please login to view your bookings."
            });
        }

        const { data, error } = await supabase
            .from("bookings")
            .select("*")
            .eq("customer_id", user.id)
            .order("created_at", {
                ascending: false
            });

        if (error) {
            console.error("Supabase bookings error:", error);

            return res.status(500).json({
                success: false,
                message: "Could not load bookings.",
                error: error.message
            });
        }

        res.json({
            success: true,
            bookings: data
        });

    } catch (error) {

        console.error("Get bookings error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while loading bookings."
        });
    }
});

// =========================
// TEST SUPABASE
// =========================

app.get("/api/test-supabase", async (req, res) => {

    const { data, error } = await supabase
        .from("services")
        .select("*")
        .limit(1);

    if (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }

    res.json({
        success: true,
        message: "Supabase connection is working!",
        data
    });
});

/* =========================
   PROFESSIONAL PROFILE
========================= */

app.post("/api/professionals", async (req, res) => {
    try {
        const user = await getAuthenticatedUser(req);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Please login first."
            });
        }

        const {
            service_category,
            experience_years
        } = req.body;

        if (!service_category) {
            return res.status(400).json({
                success: false,
                message: "Please select a service category."
            });
        }

        const { data, error } = await supabase
            .from("professionals")
            .upsert({
                id: user.id,
                service_category: service_category,
                experience_years: Number(experience_years) || 0
            })
            .select()
            .single();

        if (error) {
            console.error(
                "Professional profile error:",
                error
            );

            return res.status(500).json({
                success: false,
                message: "Could not create professional profile.",
                error: error.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Professional profile created successfully!",
            professional: data
        });

    } catch (error) {
        console.error(
            "Professional server error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Server error while creating professional profile."
        });
    }
});

// =========================
// START SERVER
// =========================

app.listen(PORT, "0.0.0.0", () => {
    console.log(
        `SAHYOG server running at http://localhost:${PORT}`
    );
});