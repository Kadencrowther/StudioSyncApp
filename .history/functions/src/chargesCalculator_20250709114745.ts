import * as functions from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { FamilyData, StudioData, StudentData, Discount, Fee } from "./types";

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

// --- Express App Setup ---
const app = express();

app.use(
  cors({
    origin: [
      "https://studiosync-af73d.web.app",
      "https://studiosync-af73d.firebaseapp.com",
      "https://studiosyncdance.com",
      "http://localhost:5000",
    ],
    methods: ["POST", "OPTIONS", "GET"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.path} - Origin: ${
      req.headers.origin || "unknown"
    }`
  );
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Charges Calculator API is working!",
    timestamp: new Date().toISOString(),
  });
});

app.post("/calculateFamilyCharges", async (req: Request, res: Response) => {
  const logs: string[] = [];
  const logAndCapture = (message: string, data: any = null) => {
    const logEntry = data ? `${message}: ${JSON.stringify(data)}` : message;
    console.log(logEntry);
    logs.push(logEntry);
  };

  try {
    const { familyData, studioId } = req.body as {
      familyData: FamilyData;
      studioId: string;
    };

    logAndCapture(
      `Request received for family: ${
        familyData?.id || familyData?.FamilyId
      } in studio: ${studioId}`
    );

    if (!familyData || !studioId) {
      logAndCapture("Missing required parameters");
      return res.status(400).json({
        success: false,
        error: "Missing required parameters: familyData and studioId",
        logs,
      });
    }

    // TODO: Fetch necessary Firestore data here (students, discounts, fees, etc.)

    // TODO: Replace with actual calculation logic
    const result = {
      success: true,
      chargeData: {
        students: [],
        totalTuition: 0,
        totalFees: 0,
        discounts: [],
        totalDiscount: 0,
        finalTotal: 0,
        ratePlan: familyData.RatePlan || "Monthly",
      },
      logs,
    };

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    logAndCapture("Sending response to client");
    return res.json(result);
  } catch (error: any) {
    logAndCapture(`Error: ${error.message}`, error.stack);

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    return res.status(500).json({
      success: false,
      error: error.message || "An unexpected error occurred",
      logs,
    });
  }
});

// --- Export as Firebase Function ---
export const chargesCalculator = functions.onRequest(
  {
    region: "us-central1",
    memory: "512MiB",
    minInstances: 0,
    maxInstances: 10,
    timeoutSeconds: 60,
    invoker: "public",
  },
  app
);
