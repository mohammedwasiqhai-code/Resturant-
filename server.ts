import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { INITIAL_MENU_ITEMS, INITIAL_REVIEWS } from "./src/data/restaurantData";
import { Order, Reservation, Review } from "./src/types";

// In-memory data stores
let menuItems = [...INITIAL_MENU_ITEMS];
let reviews: Review[] = [...INITIAL_REVIEWS];
let reservations: Reservation[] = [
  {
    id: "res-demo-1",
    confirmationCode: "LAURA-9482",
    fullName: "Victoria Sterling",
    email: "victoria@example.com",
    phone: "(416) 555-0199",
    guestsCount: 4,
    date: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
    timeSlot: "7:00 PM",
    seatingArea: "chef_counter",
    occasion: "anniversary",
    specialRequests: "Window corner if possible, celebrating 10th anniversary.",
    status: "confirmed",
    createdAt: new Date().toISOString(),
  },
];
let orders: Order[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Helper to initialize Gemini safely
  function getGeminiClient(): GoogleGenAI | null {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // 1. Menu API
  app.get("/api/menu", (_req, res) => {
    res.json({ items: menuItems });
  });

  // 2. Reviews API
  app.get("/api/reviews", (_req, res) => {
    res.json({ reviews });
  });

  app.post("/api/reviews", (req, res) => {
    try {
      const { authorName, authorLocation, rating, title, comment, category, recommendedDish, verifiedDiner } = req.body;
      if (!authorName || !rating || !comment) {
        return res.status(400).json({ error: "Missing required review fields." });
      }

      const newReview: Review = {
        id: `rev-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        authorName,
        authorLocation: authorLocation || "Verified Guest",
        rating: Number(rating),
        date: "Just now",
        title: title || "Wonderful experience",
        comment,
        category: category || "Overall",
        verifiedDiner: verifiedDiner ?? true,
        recommendedDish: recommendedDish || undefined,
        helpfulCount: 0,
        avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80`,
      };

      reviews.unshift(newReview);
      res.status(201).json({ success: true, review: newReview });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to submit review." });
    }
  });

  app.post("/api/reviews/:id/helpful", (req, res) => {
    const { id } = req.params;
    const review = reviews.find((r) => r.id === id);
    if (!review) return res.status(404).json({ error: "Review not found" });
    review.helpfulCount += 1;
    review.userVotedHelpful = true;
    res.json({ success: true, helpfulCount: review.helpfulCount });
  });

  // 3. Reservations API
  app.get("/api/reservations", (_req, res) => {
    res.json({ reservations });
  });

  app.post("/api/reservations", (req, res) => {
    try {
      const { fullName, email, phone, guestsCount, date, timeSlot, seatingArea, occasion, specialRequests } = req.body;

      if (!fullName || !email || !phone || !date || !timeSlot) {
        return res.status(400).json({ error: "Please provide all required reservation details." });
      }

      const confirmationCode = `LAURA-${Math.floor(1000 + Math.random() * 9000)}`;

      const newReservation: Reservation = {
        id: `res-${Date.now()}`,
        confirmationCode,
        fullName,
        email,
        phone,
        guestsCount: Number(guestsCount) || 2,
        date,
        timeSlot,
        seatingArea: seatingArea || "main_dining",
        occasion: occasion || "casual",
        specialRequests: specialRequests || "",
        status: "confirmed",
        createdAt: new Date().toISOString(),
      };

      reservations.unshift(newReservation);
      res.status(201).json({ success: true, reservation: newReservation });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to create reservation." });
    }
  });

  app.get("/api/reservations/:code", (req, res) => {
    const { code } = req.params;
    const reservation = reservations.find(
      (r) => r.confirmationCode.toUpperCase() === code.toUpperCase()
    );
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found." });
    }
    res.json({ reservation });
  });

  app.post("/api/reservations/:code/cancel", (req, res) => {
    const { code } = req.params;
    const reservation = reservations.find(
      (r) => r.confirmationCode.toUpperCase() === code.toUpperCase()
    );
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found." });
    }
    reservation.status = "cancelled";
    res.json({ success: true, reservation });
  });

  // 4. Online Orders API
  app.post("/api/orders", (req, res) => {
    try {
      const { fulfillmentType, items, subtotal, discount, promoCode, deliveryFee, tax, tip, total, customer, paymentMethod } = req.body;

      if (!items || items.length === 0 || !customer || !customer.fullName) {
        return res.status(400).json({ error: "Invalid order data." });
      }

      const orderNumber = `LA-${Math.floor(100000 + Math.random() * 900000)}`;
      const estimatedMinutes = fulfillmentType === "delivery" ? 35 : 20;

      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber,
        createdAt: new Date().toISOString(),
        status: "confirmed",
        fulfillmentType,
        items,
        subtotal: Number(subtotal),
        discount: Number(discount || 0),
        promoCode: promoCode || undefined,
        deliveryFee: Number(deliveryFee || 0),
        tax: Number(tax),
        tip: Number(tip || 0),
        total: Number(total),
        customer,
        paymentMethod: paymentMethod || "card",
        estimatedMinutes,
      };

      orders.unshift(newOrder);
      res.status(201).json({ success: true, order: newOrder });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to submit order." });
    }
  });

  app.get("/api/orders/:orderNumber", (req, res) => {
    const { orderNumber } = req.params;
    const order = orders.find(
      (o) => o.orderNumber.toUpperCase() === orderNumber.toUpperCase()
    );
    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }
    res.json({ order });
  });

  // 5. AI Sommelier & Menu Pairing Concierge
  app.post("/api/ai/pairing-sommelier", async (req, res) => {
    const { query, selectedDishes, occasion, guestsCount } = req.body;

    try {
      const ai = getGeminiClient();

      if (ai) {
        const dishListPrompt = selectedDishes && selectedDishes.length > 0
          ? `The guest is considering these dishes: ${selectedDishes.join(", ")}.`
          : "The guest is asking for recommendations.";

        const prompt = `You are Elena Rossi, the Master Sommelier & Culinary Director at L'Aura, a luxury Italian Woodfire restaurant.
Guest Query: "${query || "Please recommend a harmonious 3-course dinner pairing"}"
${dishListPrompt}
Occasion: ${occasion || "Fine Dining Evening"}, Party Size: ${guestsCount || 2}.

Our menu highlights:
- Starters: Black Truffle & Fontina Arancini, Heirloom Burrata & Woodfired Figs, Hamachi Crudo.
- Pastas: Wild Boar Pappardelle, Maine Lobster & Saffron Ravioli, Truffled Cacio e Pepe.
- Woodfired Pizzas: Tartufo Bianco & Chanterelle Pizza, Spicy Calabrian Soppressata & Hot Honey.
- Mains: 45-Day Dry Aged Prime Florentine Ribeye (32oz), Pan-Roasted Chilean Sea Bass Acqua Pazza, Duck Breast.
- Dolci: Smoked Bronte Pistachio Tiramisu, Dark Chocolate & Hazelnut Fondant.
- Drinks & Cellar: Brunello di Montalcino DOCG 2017, Franciacorta Brut DOCG, Super Tuscan Ornellaia, Smoked Rosemary Old Fashioned, Amalfi Limoncello Spritz.

Provide a response formatted in clean JSON with the following structure:
{
  "greeting": "A warm, sophisticated 1-sentence sommelier greeting",
  "recommendations": [
    {
      "courseTitle": "e.g., First Course / Antipasto Pairing",
      "dishName": "Exact dish name from menu",
      "dishDescription": "Why it delights the palate",
      "pairedDrink": "Exact wine or artisanal cocktail from our cellar",
      "pairingNotes": "Sensory explanation of tannins, acidity, or aroma interaction",
      "chefTip": "An insider culinary secret or serving suggestion"
    }
  ],
  "sommelierAdvice": "A concluding piece of gracious dining advice (1-2 sentences)"
}
Return ONLY valid JSON.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
          },
        });

        const text = response.text;
        if (text) {
          try {
            const parsed = JSON.parse(text);
            return res.json({ success: true, ...parsed });
          } catch (e) {
            // fallback to structured text
          }
        }
      }

      // Intelligent Curated Fallback if Gemini key is unset or parsing fails
      res.json({
        success: true,
        greeting: "Benvenuti a L'Aura. As your sommelier, I have crafted an exquisite culinary synergy tailored to your table.",
        recommendations: [
          {
            courseTitle: "Antipasti Pairing",
            dishName: "Heirloom Burrata & Woodfired Figs",
            dishDescription: "Creamy Pugliese burrata paired with ember-roasted mission figs and 24-month Prosciutto di Parma.",
            pairedDrink: "Franciacorta Brut DOCG, Lombardy",
            pairingNotes: "The crisp, brioche-like effervescence and lively acidity cut effortlessly through the rich milk fats while highlighting the natural fig sweetness.",
            chefTip: "Spread a touch of the 12-year balsamic onto the warm sourdough before layering the burrata."
          },
          {
            courseTitle: "Main Course Symphony",
            dishName: "Handmade Wild Boar Pappardelle",
            dishDescription: "Silk egg pasta ribbons rolled daily with 14-hour slow-braised wild boar shoulder ragù and 36-month Parmigiano.",
            pairedDrink: "Brunello di Montalcino DOCG 2017",
            pairingNotes: "Rich, dusty tannins and structured dark cherry notes in this aged Sangiovese Grosso balance the savory wild herbs and deep umami ragù.",
            chefTip: "Allow the glass to breathe for 5 minutes to release notes of wild rosemary and forest floor."
          },
          {
            courseTitle: "Dolce Finale",
            dishName: "Smoked Bronte Pistachio Tiramisu",
            dishDescription: "Sicilian Bronte pistachio mascarpone mousse with rum-dipped Savoiardi and applewood smoke.",
            pairedDrink: "Passito di Pantelleria DOC",
            pairingNotes: "Golden sun-dried Zibibbo grapes bring luscious apricot and honey tones that elevate the toasted pistachio aromas.",
            chefTip: "Inhale the delicate applewood aroma before your very first spoonful."
          }
        ],
        sommelierAdvice: "We recommend letting our cellar team decant full-bodied Tuscan reds 15 minutes prior to main course service."
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to generate pairing." });
    }
  });

  // Vite Middleware & Static handling
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`L'Aura Restaurant Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
