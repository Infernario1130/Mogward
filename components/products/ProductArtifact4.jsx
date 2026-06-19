"use client"

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from 'next/link';
/* ==========================================================================
   MOGWARD — THE DIET PROTOCOL
   Single-file interactive reader (sibling to Training / Frame / Skincare).
   Violet accent layer — shared design system with Frame + Skincare.
   Section numbers render as "S" (e.g. S01), never the section glyph.
   Component index:
     <SectionHeader> <HeroVisual> <DisclaimerBanner> <PullQuote>
     <EnergyLedgerVisual> <TwoSystemsComparison> <MaintenanceCalculator>
     <WeeklyDiscoveryTracker> <BodyFatTargetSelector> <ProteinCalculator>
     <MacroBreakdownChart> <PreWorkoutTimingCard> <CaseDecisionTree>
     <DeficitTacticsList> <SupplementTierList> <DietExampleBrowser>
     <ScienceCallout> <PracticalCallout> <CautionCallout>
     <FAQAccordion> <UpsellCard> <CoachingCrossSell> <CompletionBadge> <Blocks>
   ========================================================================== */

const CONTENT = {"disclaimer": "This guide is for educational purposes and general nutrition habits. It is not medical advice. If you have an underlying health condition, a history of disordered eating, or any concern about changing your diet, consult a qualified healthcare professional first.", "sections": [{"num": 0, "id": "section-0", "code": "S00", "title": "THE TWO-NUMBER SYSTEM", "category": "FOUNDATION", "short": "THE TWO-NUMBER SYSTEM", "intro": [{"type": "p", "text": "Dieting has been turned into an industry built on confusion, and most of that confusion is manufactured on purpose. Every contradictory headline, every \"this one trick\" video, every supplement ad promising a shortcut — all of it exists to make a simple problem feel complicated enough that you need to keep buying solutions to it. This guide cuts it down to the two variables that actually determine whether you get leaner: how much you eat, and how much protein is in what you eat. Everything else is noise layered on top to sell you something."}, {"type": "p", "text": "If you've read **The Frame Protocol**, this is the deep-dive execution system for Step 1 — Low Body Fat, the single highest-leverage step in that entire framework. If you haven't read it, that's fine too: this guide stands completely on its own for anyone whose goal is simply to get lean, as efficiently as possible, without sacrificing muscle or strength along the way."}, {"type": "p", "text": "Before we get to the system, we're resolving the biggest myth in dieting: that losing fat and building or keeping muscle are somehow in conflict, forcing you to choose one and sacrifice the other. They're not in conflict, and you don't have to choose. Once you understand why, the rest of this guide becomes a lot easier to trust — because every recommendation that follows is built on that same foundation."}], "subs": []}, {"num": 1, "id": "section-1", "code": "S01", "title": "ENERGY FUNDAMENTALS", "category": "FOUNDATION", "short": "ENERGY FUNDAMENTALS", "intro": [{"type": "p", "text": "A **calorie** is just a unit of energy. That's all it is — not a moral category, not a \"good\" or \"bad\" label. Every calorie you consume comes from one of three places: protein, carbs, or fat. There's no fourth source. Micronutrients (vitamins, minerals) matter enormously for health, but they don't contribute meaningfully to the energy side of this equation — they're a separate conversation."}, {"type": "p", "text": "**Maintenance calories** are the number of calories that keeps your bodyweight exactly where it is — energy in equals energy out. Eat above that number consistently, and you gain weight. Eat below it consistently, and you lose weight. This isn't a theory you need to take on faith; it's the most well-established principle in nutrition science, and it holds regardless of what specific foods make up those calories."}, {"type": "p", "text": "A **calorie deficit** means eating below your maintenance number. When you do this, your body has to make up the energy shortfall from somewhere — and it pulls from stored body fat. This is the *only* mechanism by which fat loss happens. Not a specific food. Not meal timing. Not a \"metabolism-boosting\" trick. A sustained calorie deficit is the singular requirement, full stop."}, {"type": "p", "text": "A **calorie surplus** means eating above maintenance — relevant context for building muscle at scale, but not the focus of this guide, since most readers picking this up are trying to get leaner, not bigger."}, {"type": "p", "text": "It helps to picture this as a simple ledger. Every day, your body has an \"energy in\" column (everything you eat and drink) and an \"energy out\" column (your resting metabolism, digestion, movement, and exercise combined). Whatever the difference between those two columns is, over time, determines whether you gain, lose, or hold steady. There's no way to \"trick\" this ledger with a specific food choice or a clever timing strategy — the only two levers that actually move it are eating less or moving more, and both ultimately just change one side of the same equation."}, {"type": "p", "text": "Here's the part that actually resolves the confusion most people have: **fat loss and muscle building are two separate systems, driven by two separate inputs.**"}, {"type": "list", "ordered": false, "items": ["**Fat loss is purely a function of energy balance.** Calories in versus calories out. Nothing else moves this needle.", "**Muscle building is a function of training stimulus (progressive resistance training) plus adequate protein intake** — it is *not* a function of being in a calorie surplus. Surplus calories make building muscle easier and faster, but they are not a requirement for the process to occur."]}, {"type": "p", "text": "This is why the old \"bulk to build, cut to lean out\" framing confuses more people than it helps. It's not wrong, exactly — a surplus does make muscle building somewhat easier and faster. But it creates the false impression that a deficit actively works against muscle, as if the two processes are drawing from the same pool and fighting over it. They aren't. One pool is energy balance. The other is mechanical tension plus protein. You can be withdrawing from the first pool (a deficit) while still depositing into the second (training stimulus and protein) at the same time, because they're not the same account."}, {"type": "p", "text": "Because these are separate systems with separate inputs, **you can run a calorie deficit and still build, or at minimum fully maintain, muscle** — as long as you're training properly and hitting your protein number. This holds especially true for beginners and intermediate lifters, whose bodies are highly responsive to a training stimulus regardless of energy balance, and for anyone carrying a reasonable amount of body fat to begin with, since stored fat itself can partially offset the energy cost of building new muscle tissue."}, {"type": "p", "text": "This guide covers the energy/diet half of that equation in full — the calorie and protein side. The training-stimulus half — how to actually train to build or maintain muscle while leaning out — is covered in **The Training Protocol**, the companion system built specifically for that side of the equation."}, {"type": "p", "text": "Now that you understand the inputs, here's exactly how to control them."}], "subs": []}, {"num": 2, "id": "section-2", "code": "S02", "title": "YOUR NUMBERS — CALORIES & PROTEIN", "category": "CORE", "short": "CALORIES & PROTEIN", "intro": [{"type": "p", "text": "Out of everything people obsess over when dieting — meal timing, food combinations, \"clean eating,\" cheat days, intermittent fasting windows — only **two variables** actually determine your results: total calorie amount, and protein intake. Everything else is decoration on top of these two numbers. Get these two right and the rest is genuinely optional."}, {"type": "p", "text": "This isn't a simplification for the sake of being catchy — it's a deliberate filter. Every dieting question you'll ever have eventually traces back to one of these two numbers. \"Should I eat carbs at night?\" doesn't matter if your calories and protein are correct. \"Is this food healthy?\" doesn't matter for fat loss if it fits inside your numbers. Learning to ask \"does this affect my calories or my protein?\" before anything else is the single most useful filter this guide can give you."}], "subs": [{"title": "Amount of Calories", "blocks": [{"type": "p", "text": "Your calorie target depends **entirely on your current body fat percentage** — not your goals around muscle, not your \"body type,\" not anything else. The target is a function of where you are now and where you want to be."}, {"type": "p", "text": "**Step 1: Get a starting estimate.** A simple bodyweight-based multiplier gives you a reasonable starting guideline — nothing more. Treat any number from a formula or calculator as a rough starting point, never as gospel."}, {"type": "p", "text": "The number that calculator gives you is a **guideline, not your actual maintenance**. Your real maintenance can only be discovered through real-world tracking of your own body. No formula knows your actual metabolism, activity level, or NEAT (non-exercise movement — the calories burned through fidgeting, walking, posture, and daily life outside of structured exercise) better than your own bodyweight trend does. Two people at the same height, weight, and age can have maintenance numbers several hundred calories apart, simply because one of them naturally moves more throughout the day."}, {"type": "p", "text": "**Step 2: Run the 1-week discovery protocol.**"}, {"type": "list", "ordered": true, "items": ["Eat at your calculated estimate for one full week, tracking your bodyweight daily (same time, same conditions, ideally first thing in the morning, after using the bathroom, before eating or drinking anything).", "**If the scale goes up** → your real maintenance is lower than the estimate. Lower your calorie target for the next week.", "**If the scale stays roughly the same** → you've found your true maintenance. This is your real number.", "**If the scale goes down** → your real maintenance is higher than the estimate. If your goal was weight loss, this is a genuine win — you're already losing fat without trying. Acknowledge it and keep going at that intake, or adjust further if you want a faster rate."]}, {"type": "p", "text": "This is the only reliable way to find your true maintenance. Run it for a full week, not two days — daily weight fluctuates from water, sodium, and digestion, and you need the trend, not a single data point. If you want to be extra precise, average your morning weigh-ins across the week rather than comparing the first day to the last day; that smooths out the daily noise and gives you a cleaner read on the actual trend."}, {"type": "p", "text": "Once true maintenance is established, the next decision is what body fat percentage — what level of leanness — you actually want to be at, for the long term, not just for a short-term cut."}]}, {"title": "Protein", "blocks": [{"type": "p", "text": "The formula is simple: **1.8x–2.0x your bodyweight in kilograms, in grams of protein per day.** (Assume kilograms as the standard unit here — the source math assumes metric, so a 75kg person targets roughly 135–150g of protein daily, and a 90kg person targets roughly 162–180g.)"}, {"type": "list", "ordered": false, "items": ["Use **1.8x** if you're not yet very lean.", "Use **2.0x** if you're under roughly **12% body fat** — leaner individuals benefit from slightly higher protein, particularly while in a deficit, because it does more work protecting existing muscle when there's less of a calorie buffer to work with, and because there's simply less stored fat available to partially offset the energy gap."]}, {"type": "p", "text": "**More is not better.** There's no meaningful benefit to drastically exceeding this range. Extra protein beyond this point just eats into your calorie budget that could otherwise go toward fat, carbs, or quality of life — with no additional muscle-protective or muscle-building benefit to show for it. If you've seen recommendations far above this range elsewhere, that's usually marketing from the supplement industry, not a reflection of where the actual benefit ceiling sits."}]}]}, {"num": 3, "id": "section-3", "code": "S03", "title": "MACROS, MEALS & PRE-WORKOUT TIMING", "category": "EXECUTION", "short": "MACROS & MEALS", "intro": [{"type": "p", "text": "Regardless of how \"healthy\" or \"unhealthy\" a food seems, every single calorie you eat breaks down into one of three macronutrients: **protein, carbs, and fat (P/C/F).** That's the entire energy equation. No food escapes this categorization."}, {"type": "p", "text": "Calories per gram, for reference:"}, {"type": "list", "ordered": false, "items": ["**Protein: 4 kcal/g**", "**Carbs: 4 kcal/g**", "**Fat: 9 kcal/g**"]}], "subs": [{"title": "Setting Your Macros: The Hierarchy", "blocks": [{"type": "p", "text": "Once your total calorie target is fixed, set your macros in this exact order:"}, {"type": "list", "ordered": true, "items": ["**Set protein first** — using the 1.8x–2.0x formula established above. This is non-negotiable and comes before anything else.", "**Set fat at 20–25% of your total target calories.** This range supports hormone health and general function without eating excessively into your calorie budget. To turn that percentage into grams, multiply your total calories by 0.20–0.25, then divide by 9 (since fat is 9 kcal/g). For example, at 2,200 kcal, 22% fat works out to roughly 484 kcal, or about 54g of fat per day.", "**Fill all remaining calories with carbs.** Whatever's left after protein and fat is your carb target — there's no separate formula needed here. Take your total calorie target, subtract your protein calories and your fat calories, and divide the remainder by 4 (carbs are 4 kcal/g) to get your daily carb gram target."]}, {"type": "p", "text": "Worked example, start to finish: a 90kg man at 2,400 kcal targets 162g protein (1.8x) = 648 kcal. Fat at 22% of 2,400 kcal = 528 kcal, or about 59g. That leaves 2,400 − 648 − 528 = 1,224 kcal for carbs, or roughly 306g. That's the entire macro-setting process, every time, regardless of bodyweight or calorie target."}]}, {"title": "Meal Frequency and Composition: Flexible by Design", "blocks": [{"type": "p", "text": "**Number of meals** is flexible: **3 to 5 meals a day** is the reasonable range, and there's no magic number within it. Whatever fits your schedule and appetite works. Some people do better with fewer, larger meals because it's simpler to plan around; others prefer more frequent, smaller meals because it keeps hunger more manageable throughout the day. Neither approach has an advantage for fat loss itself — it's purely a question of what you can stick to."}, {"type": "p", "text": "The *type* and *order* of meals throughout the day is entirely up to personal preference, **as long as your daily calorie and protein targets are met.** There's no required meal structure, no rule about \"carbs at night,\" no required breakfast, and no rule that protein has to be spread perfectly evenly across every meal. One caveat: meals should still be built from **high-quality food sources** for the *majority* of the time. Occasional processed food is fine — it shouldn't be the default foundation of your diet, mostly because whole foods tend to be more filling per calorie, which makes the deficit easier to sustain, not because processed food is somehow forbidden."}]}, {"title": "Pre-Workout Meal Timing", "blocks": [{"type": "p", "text": "**2–3 hours before training:** carbs are the priority here — target **1–2g per kg of bodyweight**, with moderate protein, lower fat, and moderate fiber, giving your body time to digest before you train."}, {"type": "list", "ordered": false, "items": ["*Example 1:* Grilled chicken breast, white rice, and steamed vegetables.", "*Example 2:* Greek yogurt with oats, banana, and a drizzle of honey."]}, {"type": "p", "text": "**30–90 minutes before training:** carbs still matter — **20–60g** — alongside **15–30g protein**, kept low on fat (**under 10g**) and low on fiber, both of which slow digestion and can cause discomfort close to a training session."}, {"type": "list", "ordered": false, "items": ["*Example 1:* A banana with a small scoop of whey protein mixed in water.", "*Example 2:* White toast with a thin spread of jam and a small protein shake."]}, {"type": "p", "text": "These windows aren't rigid rules you need to hit perfectly every session — they're a useful default if you're not sure what to eat before training and want to avoid feeling sluggish or having stomach discomfort mid-session. If your current pre-workout habits already work well for you, there's no need to change them just to match these numbers exactly."}]}], "preworkout": [{"window": "2–3 hours before training", "guidance": "carbs are the priority here — target **1–2g per kg of bodyweight**, with moderate protein, lower fat, and moderate fiber, giving your body time to digest before you train.", "examples": ["Grilled chicken breast, white rice, and steamed vegetables.", "Greek yogurt with oats, banana, and a drizzle of honey."]}, {"window": "30–90 minutes before training", "guidance": "carbs still matter — **20–60g** — alongside **15–30g protein**, kept low on fat (**under 10g**) and low on fiber, both of which slow digestion and can cause discomfort close to a training session.", "examples": ["A banana with a small scoop of whey protein mixed in water.", "White toast with a thin spread of jam and a small protein shake."]}]}, {"num": 4, "id": "section-4", "code": "S04", "title": "CASE 1 VS. CASE 2 — YOUR DECISION TREE", "category": "DECISION", "short": "CASE 1 VS CASE 2", "intro": [], "subs": [{"title": "Diet Is Personal — But the Math Isn't", "blocks": [{"type": "p", "text": "Like training, diet is highly personal. It depends on your demographic, location, culture, food habits, what's actually available to you, and your day-to-day lifestyle. No single meal plan fits everyone, and anyone trying to sell you one universal plan is ignoring that reality."}, {"type": "p", "text": "That's exactly why this guide teaches the universal math and system rather than prescribing one rigid plan — the system works regardless of whether your food culture is built around rice, pasta, tortillas, or anything else. For readers who want fully personalized guidance built around their specific life — food preferences, schedule, training, and goals — that's exactly what the **1-1 Mogward Program** is designed for."}, {"type": "p", "text": "As long as the calorie and protein guidelines above are being followed, the specific foods you choose genuinely don't matter for the purposes of this protocol. Eat what fits your life, your culture, and your budget — the math doesn't care what's on the plate, only what's in it."}]}, {"title": "Case 1 vs. Case 2: Your Decision Tree", "blocks": [{"type": "p", "text": "Everything in this guide funnels into one of two cases. Figure out which one you're in, and the rest of your approach becomes obvious — there's no third option, and no need to overthink which bucket you fall into."}, {"type": "h3", "text": "Case 1: You Are Already Lean Enough"}, {"type": "p", "text": "If you're already at your ideal body fat percentage, the action is simple: **keep eating at maintenance calories, for the long term**, while continuing to hit your protein target (default to the **1.8x** multiplier here unless you're under 12% body fat, consistent with the protein section above). That's it. You're not trying to lose more, so there's no deficit to run."}, {"type": "p", "text": "This is, in some ways, the easier case to execute but the harder one to stay disciplined in, because there's no visible \"progress\" to chase anymore — the scale isn't supposed to move. The goal here shifts from \"create change\" to \"maintain the result,\" which is just as valuable a skill, even though it gets a lot less attention in fitness culture than the cutting phase does."}, {"type": "h3", "text": "Case 2: You Are Not Lean Enough Yet"}, {"type": "p", "text": "If you're above your target body fat percentage, here's the entire strategy, distilled into five words:"}, {"type": "p", "text": "**Go. On. A. Calorie. Deficit.**"}, {"type": "p", "text": "That's the whole instruction. A calorie deficit is the *only* answer for fat loss — not tips, not tricks, not ab workouts, not herbal teas, not detox products, not anything else marketed to you as a shortcut. If someone is selling you a fat-loss product that isn't, at its core, a calorie deficit in disguise, it's a scam. Say it plainly, because it's true. Spot-reduction exercises, \"fat-burning zones,\" waist trainers, and detox teas have sold billions of dollars of product on the back of this single, simple fact being inconvenient to admit."}, {"type": "p", "text": "**How much of a deficit?** Somewhere in the range of **200–700 kcal below maintenance.** The size depends entirely on how fast you want to get lean. A larger deficit isn't inherently dangerous *if* you know how to diet properly — hitting your protein, choosing quality foods, and managing hunger. The risk comes from doing a deficit poorly, not from the size of the deficit itself. Someone running a 700 kcal deficit while hitting their protein target and training consistently is in a far better position than someone running a sloppy 300 kcal deficit with inconsistent protein and constant hunger-driven binges."}, {"type": "p", "text": "A deficit can also be widened through cardio rather than further cutting food — increasing energy output instead of decreasing intake. This gives you a second lever to pull if you don't want to cut food intake any further but still want a bigger deficit. Training and cardio programming for this purpose is covered in depth in **The Training Protocol**."}, {"type": "p", "text": "**How long should the deficit last?** Until you reach your target body fat percentage. After that, you transition back to eating at maintenance for the rest of your life — Case 2 graduates into Case 1. A deficit isn't a permanent state; it's a phase with an endpoint, and treating it as a temporary, goal-bound process rather than a lifestyle is part of what makes it sustainable."}, {"type": "p", "text": "**Do you need a calorie surplus to build muscle?** No — not unless you're already exceptionally lean, under roughly **10% body fat**, in which case a surplus may become necessary to keep building muscle effectively from that point forward. For the vast majority of people running a moderate deficit, training stimulus plus adequate protein is sufficient to maintain — or even slowly build — muscle while losing fat."}]}]}, {"num": 5, "id": "section-5", "code": "S05", "title": "EXECUTING YOUR DEFICIT", "category": "EXECUTION", "short": "EXECUTING YOUR DEFICIT", "intro": [{"type": "p", "text": "Most readers of this guide are going to be in a deficit, since most people picking up a dieting guide are in Case 2. A deficit is simple in concept — eat less than you burn — but the execution is where most people actually struggle and quit. These four tactics are the ones that consistently separate people who stick with a deficit for months from people who white-knuckle it for a week and bail."}, {"type": "p", "text": "**1. Avoid adding fat through cooking oil.** A reasonable diet already contains enough healthy fat sources — you don't need to add unnecessary dense calories on top through cooking oil. Oil is calorie-dense (9 kcal/g, remember) and easy to overpour without noticing — a few extra tablespoons across a day's cooking can add several hundred calories without any visible change to your plate. Alternatives: boiling, air frying, or cooking in a small amount of liquid like water or milk instead of oil. *Worked example:* cook a chicken breast in a non-stick pan with a closed lid and a small splash of milk or water instead of oil — you get the same result with a fraction of the added calories."}, {"type": "p", "text": "**2. Be mindful of sugar.** Sugar is similarly calorie-dense and easy to overconsume, particularly through sugary drinks, treats, and desserts specifically — not \"carbs\" broadly. This isn't about never having these foods. It's about conscious moderation, not elimination."}, {"type": "p", "text": "**3. Be conscious of what you're eating, especially when eating out.** Once you've spent real time tracking and measuring your food, you develop a strong intuitive sense of the calorie and protein content of meals you didn't personally cook. From that point forward, the skill is conscious adjustment. *Worked example:* if you had something calorie-dense like fast food at lunch, consciously balance it by adjusting dinner lighter — that's the entire skill."}, {"type": "p", "text": "**4. Don't follow an overly \"strict\" diet.** This is flexible dieting, by design. Nothing is prohibited. A good diet is one that's actually followed consistently — not a rigid plan followed perfectly for three days before a relapse, which produces zero real-world results. Having your favorite \"junk\" food occasionally, with conscious awareness of its calories, is completely fine and fully expected."}, {"type": "p", "text": "None of these four tactics require special willpower or a complicated tracking app — they're just habits of awareness. Master them, and a deficit stops feeling like a punishment and starts feeling like a slightly adjusted version of how you already eat."}], "subs": [], "tactics": [{"n": 1, "title": "Avoid adding fat through cooking oil", "body": "A reasonable diet already contains enough healthy fat sources — you don't need to add unnecessary dense calories on top through cooking oil. Oil is calorie-dense (9 kcal/g, remember) and easy to overpour without noticing — a few extra tablespoons across a day's cooking can add several hundred calories without any visible change to your plate. Alternatives: boiling, air frying, or cooking in a small amount of liquid like water or milk instead of oil.", "worked": "cook a chicken breast in a non-stick pan with a closed lid and a small splash of milk or water instead of oil — you get the same result with a fraction of the added calories."}, {"n": 2, "title": "Be mindful of sugar", "body": "Sugar is similarly calorie-dense and easy to overconsume, particularly through sugary drinks, treats, and desserts specifically — not \"carbs\" broadly. This isn't about never having these foods. It's about conscious moderation, not elimination.", "worked": null}, {"n": 3, "title": "Be conscious of what you're eating, especially when eating out", "body": "Once you've spent real time tracking and measuring your food, you develop a strong intuitive sense of the calorie and protein content of meals you didn't personally cook. From that point forward, the skill is conscious adjustment.", "worked": "if you had something calorie-dense like fast food at lunch, consciously balance it by adjusting dinner lighter — that's the entire skill."}, {"n": 4, "title": "Don't follow an overly \"strict\" diet", "body": "This is flexible dieting, by design. Nothing is prohibited. A good diet is one that's actually followed consistently — not a rigid plan followed perfectly for three days before a relapse, which produces zero real-world results. Having your favorite \"junk\" food occasionally, with conscious awareness of its calories, is completely fine and fully expected.", "worked": null}]}, {"num": 6, "id": "section-6", "code": "S06", "title": "SUPPLEMENTATION", "category": "REFERENCE", "short": "SUPPLEMENTATION", "intro": [{"type": "p", "text": "Supplementation **supplements** the diet. It is not mandatory, and nothing in this category is a requirement for results. Everything below is optional context, not a shopping list you need to clear before starting."}, {"type": "list", "ordered": false, "items": ["**Whey protein** is just a convenient protein source — not magic. It's nutritionally equivalent to whole-food protein for the purpose of hitting your daily target. Useful for convenience (fast, portable, easy to dose), not superior in effect to chicken, eggs, or fish.", "**Creatine** is one of the few supplements with genuinely strong evidence behind it — for training performance, strength, and power output. It is not a fat-loss supplement, and shouldn't be marketed or used as one. Take it for what it actually does.", "**Pre-workout** is, in most cases, a caffeine-delivery vehicle dressed up with extra ingredients and marketing. What it actually does is give you energy and focus for training — the same thing you'd get from caffeine alone, just with a higher price tag and a more exciting label.", "**Caffeine (pure)** produces the same core effect as pre-workout, usually more cost-effectively and with more controllable dosing. If you like the effect of pre-workout, plain caffeine is the more honest version of the same product.", "**Other supplements** (multivitamin, omega-3, etc.) are general health support — not body-composition tools. They're useful for covering nutritional gaps, not for accelerating fat loss or muscle gain directly. Take them for health reasons, not transformation reasons."]}, {"type": "p", "text": "None of these change the outcome of your diet on their own. They sit entirely on top of the calorie-and-protein system already covered — useful tools for convenience and training performance, never substitutes for getting the fundamentals right."}, {"type": "p", "text": "Here's the close: **no calorie deficit will save a bad training program, and no training program will save a bad calorie deficit.** These are two separate systems, and both have to be right. If you only have one half handled, get the other half from **The Training Protocol** — or, if you want both systems built around your specific life from the start, that's exactly what the **1-1 Mogward Program** exists for."}], "subs": [], "supps": [{"name": "Whey protein", "detail": "is just a convenient protein source — not magic. It's nutritionally equivalent to whole-food protein for the purpose of hitting your daily target. Useful for convenience (fast, portable, easy to dose), not superior in effect to chicken, eggs, or fish.", "tier": "convenience"}, {"name": "Creatine", "detail": "is one of the few supplements with genuinely strong evidence behind it — for training performance, strength, and power output. It is not a fat-loss supplement, and shouldn't be marketed or used as one. Take it for what it actually does.", "tier": "worth_it"}, {"name": "Pre-workout", "detail": "is, in most cases, a caffeine-delivery vehicle dressed up with extra ingredients and marketing. What it actually does is give you energy and focus for training — the same thing you'd get from caffeine alone, just with a higher price tag and a more exciting label.", "tier": "skip"}, {"name": "Caffeine (pure)", "detail": "produces the same core effect as pre-workout, usually more cost-effectively and with more controllable dosing. If you like the effect of pre-workout, plain caffeine is the more honest version of the same product.", "tier": "worth_it"}, {"name": "Other supplements", "detail": "(multivitamin, omega-3, etc.) are general health support — not body-composition tools. They're useful for covering nutritional gaps, not for accelerating fat loss or muscle gain directly. Take them for health reasons, not transformation reasons.", "tier": "health"}]}, {"num": 7, "id": "section-7", "code": "S07", "title": "11 DIET EXAMPLES", "category": "REFERENCE", "short": "11 DIET EXAMPLES", "intro": [{"type": "p", "text": "Each example below states the starting context, target calories, target protein, and a realistic example of how that might look across a day's meals."}, {"type": "p", "text": "**1. Male, 25% body fat, Case 2, aggressive cut.** Target: 2,000 kcal, 160g protein (1.8x at 89kg). Example day: eggs and oats for breakfast, grilled chicken and rice for lunch, salmon and vegetables for dinner, Greek yogurt as a snack."}, {"type": "p", "text": "**2. Female, 30% body fat, Case 2, moderate cut.** Target: 1,500 kcal, 110g protein (1.8x at 61kg). Example day: protein smoothie for breakfast, turkey wrap for lunch, stir-fried tofu and vegetables for dinner, cottage cheese as a snack."}, {"type": "p", "text": "**3. Male, 18% body fat, Case 2, slow recomp-style cut.** Target: 2,400 kcal, 170g protein (1.8x at 94kg). Example day: protein oats for breakfast, beef and sweet potato for lunch, chicken pasta for dinner, a protein shake post-training."}, {"type": "p", "text": "**4. Female, 22% body fat, Case 2, moderate cut.** Target: 1,700 kcal, 126g protein (1.8x at 70kg). Example day: eggs and toast for breakfast, lentil soup with bread for lunch, grilled fish and quinoa for dinner."}, {"type": "p", "text": "**5. Male, 11% body fat, Case 2 nearing goal, small deficit.** Target: 2,600 kcal, 188g protein (2.0x at 94kg, under 12% threshold). Example day: egg whites and oats, chicken burrito bowl, steak and rice, casein shake before bed."}, {"type": "p", "text": "**6. Female, 14% body fat, Case 1, maintenance.** Target: 2,000 kcal, 117g protein (1.8x at 65kg). Example day: yogurt parfait, chicken Caesar wrap, salmon with roasted vegetables, mixed nuts as a snack."}, {"type": "p", "text": "**7. Male, 15% body fat, Case 2, moderate cut.** Target: 2,300 kcal, 155g protein (1.8x at 86kg). Example day: protein pancakes, turkey sandwich, ground beef tacos, a protein bar as a snack."}, {"type": "p", "text": "**8. Female, 9% body fat, Case 1 graduate, muscle-focused surplus.** Target: 2,300 kcal, 140g protein (2.0x at 70kg, under 10% — surplus territory per the muscle-building clarification above). Example day: oats with peanut butter, chicken rice bowl, pasta with ground turkey, an evening protein shake with fruit."}, {"type": "p", "text": "**9. Male, 28% body fat, Case 2, large aggressive cut.** Target: 2,200 kcal, 180g protein (1.8x at 100kg). Example day: omelet with vegetables, grilled chicken salad, lean beef stir-fry, protein shake mid-afternoon."}, {"type": "p", "text": "**10. Female, 19% body fat, Case 2, moderate cut.** Target: 1,600 kcal, 117g protein (1.8x at 65kg). Example day: protein smoothie, tuna salad, baked chicken with vegetables, a small handful of almonds."}, {"type": "p", "text": "**11. Male, 13% body fat, Case 2, final stretch to goal.** Target: 2,500 kcal, 162g protein (1.8x at 90kg). Example day: eggs and avocado toast, chicken burrito, salmon with potatoes, Greek yogurt before bed."}], "subs": [], "examples": [{"n": 1, "context": "Male, 25% body fat, Case 2, aggressive cut.", "sex": "Male", "bf": 25, "case": "Case 2", "mult": "1.8x", "kcal": "2,000", "protein": 160, "formula": "1.8x at 89kg", "meals": "eggs and oats for breakfast, grilled chicken and rice for lunch, salmon and vegetables for dinner, Greek yogurt as a snack."}, {"n": 2, "context": "Female, 30% body fat, Case 2, moderate cut.", "sex": "Female", "bf": 30, "case": "Case 2", "mult": "1.8x", "kcal": "1,500", "protein": 110, "formula": "1.8x at 61kg", "meals": "protein smoothie for breakfast, turkey wrap for lunch, stir-fried tofu and vegetables for dinner, cottage cheese as a snack."}, {"n": 3, "context": "Male, 18% body fat, Case 2, slow recomp-style cut.", "sex": "Male", "bf": 18, "case": "Case 2", "mult": "1.8x", "kcal": "2,400", "protein": 170, "formula": "1.8x at 94kg", "meals": "protein oats for breakfast, beef and sweet potato for lunch, chicken pasta for dinner, a protein shake post-training."}, {"n": 4, "context": "Female, 22% body fat, Case 2, moderate cut.", "sex": "Female", "bf": 22, "case": "Case 2", "mult": "1.8x", "kcal": "1,700", "protein": 126, "formula": "1.8x at 70kg", "meals": "eggs and toast for breakfast, lentil soup with bread for lunch, grilled fish and quinoa for dinner."}, {"n": 5, "context": "Male, 11% body fat, Case 2 nearing goal, small deficit.", "sex": "Male", "bf": 11, "case": "Case 2", "mult": "2.0x", "kcal": "2,600", "protein": 188, "formula": "2.0x at 94kg, under 12% threshold", "meals": "egg whites and oats, chicken burrito bowl, steak and rice, casein shake before bed."}, {"n": 6, "context": "Female, 14% body fat, Case 1, maintenance.", "sex": "Female", "bf": 14, "case": "Case 1", "mult": "1.8x", "kcal": "2,000", "protein": 117, "formula": "1.8x at 65kg", "meals": "yogurt parfait, chicken Caesar wrap, salmon with roasted vegetables, mixed nuts as a snack."}, {"n": 7, "context": "Male, 15% body fat, Case 2, moderate cut.", "sex": "Male", "bf": 15, "case": "Case 2", "mult": "1.8x", "kcal": "2,300", "protein": 155, "formula": "1.8x at 86kg", "meals": "protein pancakes, turkey sandwich, ground beef tacos, a protein bar as a snack."}, {"n": 8, "context": "Female, 9% body fat, Case 1 graduate, muscle-focused surplus.", "sex": "Female", "bf": 9, "case": "Case 1", "mult": "2.0x", "kcal": "2,300", "protein": 140, "formula": "2.0x at 70kg, under 10% — surplus territory per the muscle-building clarification above", "meals": "oats with peanut butter, chicken rice bowl, pasta with ground turkey, an evening protein shake with fruit."}, {"n": 9, "context": "Male, 28% body fat, Case 2, large aggressive cut.", "sex": "Male", "bf": 28, "case": "Case 2", "mult": "1.8x", "kcal": "2,200", "protein": 180, "formula": "1.8x at 100kg", "meals": "omelet with vegetables, grilled chicken salad, lean beef stir-fry, protein shake mid-afternoon."}, {"n": 10, "context": "Female, 19% body fat, Case 2, moderate cut.", "sex": "Female", "bf": 19, "case": "Case 2", "mult": "1.8x", "kcal": "1,600", "protein": 117, "formula": "1.8x at 65kg", "meals": "protein smoothie, tuna salad, baked chicken with vegetables, a small handful of almonds."}, {"n": 11, "context": "Male, 13% body fat, Case 2, final stretch to goal.", "sex": "Male", "bf": 13, "case": "Case 2", "mult": "1.8x", "kcal": "2,500", "protein": 162, "formula": "1.8x at 90kg", "meals": "eggs and avocado toast, chicken burrito, salmon with potatoes, Greek yogurt before bed."}]}, {"num": 8, "id": "section-8", "code": "S08", "title": "FREQUENTLY ASKED QUESTIONS", "category": "REFERENCE", "short": "FAQ", "intro": [], "subs": [{"title": "Energy Fundamentals / General", "blocks": [{"type": "p", "text": "**Q: Can I really lose fat and build muscle at the same time?** A: Yes — they're separate systems. Fat loss runs on energy balance; muscle building runs on training stimulus plus protein. As long as you're training properly and hitting your protein target, a moderate deficit doesn't block muscle maintenance or even slow growth for most people."}, {"type": "p", "text": "**Q: What exactly is a calorie, and why does it matter more than \"healthy vs. unhealthy\" food labels?** A: A calorie is just a unit of energy. Your body doesn't care whether that energy came from a \"clean\" or \"junk\" source for the purposes of the energy-balance equation — total calories and protein are what determine your results, not how virtuous the food felt."}, {"type": "p", "text": "**Q: Is \"maintenance calories\" the same for everyone at the same bodyweight?** A: No. Activity level, muscle mass, genetics, and daily movement (NEAT) all shift it. That's exactly why the 1-week discovery protocol exists — a formula gives you a guess, real-world tracking gives you the truth."}, {"type": "p", "text": "**Q: Will eating at a deficit make me lose muscle no matter what?** A: No. Some muscle loss risk increases with very aggressive deficits or inadequate protein/training, but a moderate deficit with proper protein intake and a real training stimulus preserves muscle for the vast majority of people."}, {"type": "p", "text": "**Q: How is this different from \"calories in, calories out is oversimplified\" arguments I've seen online?** A: Those arguments are usually really pointing out that food quality, satiety, and adherence affect how easily you maintain a deficit — true, and addressed in the deficit-execution tips above. But the underlying mechanism of fat loss itself is still energy balance, full stop."}]}, {"title": "Calories & Protein", "blocks": [{"type": "p", "text": "**Q: The calculator gave me a number — why might it be wrong for me?** A: Because it's a population-based estimate, not a measurement of you specifically. It doesn't know your actual activity level, muscle mass, or metabolism. That's exactly why the 1-week discovery protocol exists — to correct the estimate with real data."}, {"type": "p", "text": "**Q: How often should I recalculate my maintenance calories?** A: Recheck it whenever your bodyweight changes significantly (roughly every 5–10 lbs/2–5 kg lost) or every 6–8 weeks during an extended deficit, since maintenance drifts downward somewhat as bodyweight drops."}, {"type": "p", "text": "**Q: What if my weight bounces around a lot week to week — how do I know what's real?** A: Track daily and look at the weekly average trend, not individual days. Water, sodium, and digestion cause day-to-day noise; the trend across 7+ days is the signal that matters."}, {"type": "p", "text": "**Q: Why 1.8-2.0x bodyweight for protein specifically — why not more?** A: That range covers the muscle-protective and muscle-building benefit ceiling for most people. Protein beyond this range doesn't add meaningful additional benefit — it just displaces calories that could go toward fat, carbs, or flexibility in your diet."}, {"type": "p", "text": "**Q: I'm vegetarian/vegan — does the protein target change?** A: The target number stays the same — you'll just be sourcing it from plant proteins (legumes, tofu, tempeh, seitan, plant-based protein powders) instead of animal sources, often in slightly larger food volumes to hit the same gram target."}, {"type": "p", "text": "**Q: Do I need to hit my protein target every single day, or is a weekly average fine?** A: A weekly average is fine for most people. Hitting it most days with occasional lower days isn't going to derail your results — consistency over the week matters more than daily perfection."}]}, {"title": "Macros & Meals", "blocks": [{"type": "p", "text": "**Q: Why does fat get 9 calories per gram when protein and carbs only get 4?** A: It's simply how each macronutrient is metabolized — fat is more energy-dense per gram by its chemical structure. This is also why it's the easiest macro to accidentally overconsume through oils and dressings."}, {"type": "p", "text": "**Q: Do I need to eat low-carb or low-fat to lose weight faster?** A: No. Once protein is set and fat is in the 20–25% range, the carb/fat split beyond that doesn't change the rate of fat loss — total calories and protein are what drive results, not the carb-to-fat ratio."}, {"type": "p", "text": "**Q: Is intermittent fasting necessary or helpful for this approach?** A: It's not necessary — it's just one way of structuring when you eat your calories. If it helps you stick to your target without overeating, it's a useful tool. If it makes hitting your protein target harder, skip it."}, {"type": "p", "text": "**Q: What if I can't eat 3-5 meals a day because of my schedule?** A: Fewer, larger meals work fine as long as your daily totals are met. Meal frequency is flexible by design — there's no required number within reason."}, {"type": "p", "text": "**Q: Does meal timing (e.g., not eating late at night) actually matter?** A: Not for fat loss itself — total daily calories and protein matter, not when you eat them. Timing can matter for sleep quality or digestion comfort for some individuals, but it's a personal preference, not a requirement."}]}, {"title": "Deficit Execution", "blocks": [{"type": "p", "text": "**Q: How aggressive should my deficit be if I want to lose fat as fast as possible?** A: Toward the higher end of the 200–700 kcal range — but only if you're confident you can hit your protein target and manage hunger consistently. A deficit you can't sustain isn't actually faster; it just leads to quitting sooner."}, {"type": "p", "text": "**Q: Is it true that a bigger deficit always means more muscle loss?** A: Larger deficits increase the *risk* of muscle loss, especially if protein and training aren't dialed in — but a large deficit executed properly (protein hit, training maintained) still protects muscle reasonably well for most people."}, {"type": "p", "text": "**Q: What's a \"refeed\" or \"diet break,\" and do I need one?** A: A refeed is a short period (often a day or a week) of eating at or above maintenance during an extended deficit, mainly for psychological relief and adherence. Not strictly necessary for shorter cuts, but useful for longer ones."}, {"type": "p", "text": "**Q: How do I handle social events, travel, or holidays without falling off?** A: Use the conscious-adjustment skill from the deficit tips above — eat what you want at the event, and balance your other meals that day or week accordingly. One off day doesn't undo weeks of consistency."}, {"type": "p", "text": "**Q: I keep losing motivation after a few days of tracking — what should I do?** A: This usually means the deficit is too aggressive or too rigid. Loosen the deficit size, simplify your meals, or revisit the flexible dieting philosophy — sustainable beats perfect every time."}]}, {"title": "Case 1 / Case 2 / Muscle", "blocks": [{"type": "p", "text": "**Q: I'm already lean — why would I ever need a surplus?** A: Only if you want to build new muscle beyond what a deficit or maintenance phase allows, and you're already under roughly 10% body fat, where there's little fat-loss benefit left to chase and your body has less stored energy to draw from to support new muscle growth."}, {"type": "p", "text": "**Q: How do I know what body fat percentage to actually target?** A: This is a personal target based on how you want to look and feel long-term — there's no universal \"correct\" number, just a tradeoff between leanness and lifestyle flexibility (energy, social eating, mood) that only you can decide for yourself."}, {"type": "p", "text": "**Q: Can beginners build muscle in a deficit, or does that only work for advanced lifters?** A: Beginners are actually well-positioned to build muscle in a deficit, due to rapid early neuromuscular adaptations — this is one of the few populations where meaningful muscle gain in a deficit is well-documented, even at fairly aggressive deficit sizes."}, {"type": "p", "text": "**Q: What happens if I stay in a deficit too long after reaching my goal?** A: You risk unnecessary muscle loss, lowered energy, hormonal disruption, and a miserable relationship with food, for no additional benefit. Transition to maintenance (Case 1) once you hit your target — staying in a deficit indefinitely isn't a virtue, it's just unnecessary suffering."}]}, {"title": "Supplements", "blocks": [{"type": "p", "text": "**Q: Do I need protein powder to hit my protein target?** A: No — it's convenient, not required. Whole foods can hit the same target just as effectively; whey just makes it faster and easier, especially around training when you don't want a full meal."}, {"type": "p", "text": "**Q: Is creatine safe for long-term use?** A: Yes — it's one of the most extensively studied supplements available, with a strong long-term safety record for healthy individuals across decades of research."}, {"type": "p", "text": "**Q: Are fat burners or detox teas worth trying?** A: No. These are marketing products dressed up as shortcuts. There is no product that replaces a calorie deficit — if it worked, it would simply be a deficit in disguise, usually via mild appetite suppression, increased water loss, or a laxative effect, none of which represent real fat loss."}, {"type": "p", "text": "**Q: What supplement should I actually start with if I had to pick just one?** A: Creatine — it has the strongest, most consistent evidence behind it of anything in this category, and it's inexpensive, simple to dose correctly, and useful regardless of your current goal."}]}], "faqs": [{"category": "Energy Fundamentals / General", "q": "Can I really lose fat and build muscle at the same time?", "a": "Yes — they're separate systems. Fat loss runs on energy balance; muscle building runs on training stimulus plus protein. As long as you're training properly and hitting your protein target, a moderate deficit doesn't block muscle maintenance or even slow growth for most people."}, {"category": "Energy Fundamentals / General", "q": "What exactly is a calorie, and why does it matter more than \"healthy vs. unhealthy\" food labels?", "a": "A calorie is just a unit of energy. Your body doesn't care whether that energy came from a \"clean\" or \"junk\" source for the purposes of the energy-balance equation — total calories and protein are what determine your results, not how virtuous the food felt."}, {"category": "Energy Fundamentals / General", "q": "Is \"maintenance calories\" the same for everyone at the same bodyweight?", "a": "No. Activity level, muscle mass, genetics, and daily movement (NEAT) all shift it. That's exactly why the 1-week discovery protocol exists — a formula gives you a guess, real-world tracking gives you the truth."}, {"category": "Energy Fundamentals / General", "q": "Will eating at a deficit make me lose muscle no matter what?", "a": "No. Some muscle loss risk increases with very aggressive deficits or inadequate protein/training, but a moderate deficit with proper protein intake and a real training stimulus preserves muscle for the vast majority of people."}, {"category": "Energy Fundamentals / General", "q": "How is this different from \"calories in, calories out is oversimplified\" arguments I've seen online?", "a": "Those arguments are usually really pointing out that food quality, satiety, and adherence affect how easily you maintain a deficit — true, and addressed in the deficit-execution tips above. But the underlying mechanism of fat loss itself is still energy balance, full stop."}, {"category": "Calories & Protein", "q": "The calculator gave me a number — why might it be wrong for me?", "a": "Because it's a population-based estimate, not a measurement of you specifically. It doesn't know your actual activity level, muscle mass, or metabolism. That's exactly why the 1-week discovery protocol exists — to correct the estimate with real data."}, {"category": "Calories & Protein", "q": "How often should I recalculate my maintenance calories?", "a": "Recheck it whenever your bodyweight changes significantly (roughly every 5–10 lbs/2–5 kg lost) or every 6–8 weeks during an extended deficit, since maintenance drifts downward somewhat as bodyweight drops."}, {"category": "Calories & Protein", "q": "What if my weight bounces around a lot week to week — how do I know what's real?", "a": "Track daily and look at the weekly average trend, not individual days. Water, sodium, and digestion cause day-to-day noise; the trend across 7+ days is the signal that matters."}, {"category": "Calories & Protein", "q": "Why 1.8-2.0x bodyweight for protein specifically — why not more?", "a": "That range covers the muscle-protective and muscle-building benefit ceiling for most people. Protein beyond this range doesn't add meaningful additional benefit — it just displaces calories that could go toward fat, carbs, or flexibility in your diet."}, {"category": "Calories & Protein", "q": "I'm vegetarian/vegan — does the protein target change?", "a": "The target number stays the same — you'll just be sourcing it from plant proteins (legumes, tofu, tempeh, seitan, plant-based protein powders) instead of animal sources, often in slightly larger food volumes to hit the same gram target."}, {"category": "Calories & Protein", "q": "Do I need to hit my protein target every single day, or is a weekly average fine?", "a": "A weekly average is fine for most people. Hitting it most days with occasional lower days isn't going to derail your results — consistency over the week matters more than daily perfection."}, {"category": "Macros & Meals", "q": "Why does fat get 9 calories per gram when protein and carbs only get 4?", "a": "It's simply how each macronutrient is metabolized — fat is more energy-dense per gram by its chemical structure. This is also why it's the easiest macro to accidentally overconsume through oils and dressings."}, {"category": "Macros & Meals", "q": "Do I need to eat low-carb or low-fat to lose weight faster?", "a": "No. Once protein is set and fat is in the 20–25% range, the carb/fat split beyond that doesn't change the rate of fat loss — total calories and protein are what drive results, not the carb-to-fat ratio."}, {"category": "Macros & Meals", "q": "Is intermittent fasting necessary or helpful for this approach?", "a": "It's not necessary — it's just one way of structuring when you eat your calories. If it helps you stick to your target without overeating, it's a useful tool. If it makes hitting your protein target harder, skip it."}, {"category": "Macros & Meals", "q": "What if I can't eat 3-5 meals a day because of my schedule?", "a": "Fewer, larger meals work fine as long as your daily totals are met. Meal frequency is flexible by design — there's no required number within reason."}, {"category": "Macros & Meals", "q": "Does meal timing (e.g., not eating late at night) actually matter?", "a": "Not for fat loss itself — total daily calories and protein matter, not when you eat them. Timing can matter for sleep quality or digestion comfort for some individuals, but it's a personal preference, not a requirement."}, {"category": "Deficit Execution", "q": "How aggressive should my deficit be if I want to lose fat as fast as possible?", "a": "Toward the higher end of the 200–700 kcal range — but only if you're confident you can hit your protein target and manage hunger consistently. A deficit you can't sustain isn't actually faster; it just leads to quitting sooner."}, {"category": "Deficit Execution", "q": "Is it true that a bigger deficit always means more muscle loss?", "a": "Larger deficits increase the *risk* of muscle loss, especially if protein and training aren't dialed in — but a large deficit executed properly (protein hit, training maintained) still protects muscle reasonably well for most people."}, {"category": "Deficit Execution", "q": "What's a \"refeed\" or \"diet break,\" and do I need one?", "a": "A refeed is a short period (often a day or a week) of eating at or above maintenance during an extended deficit, mainly for psychological relief and adherence. Not strictly necessary for shorter cuts, but useful for longer ones."}, {"category": "Deficit Execution", "q": "How do I handle social events, travel, or holidays without falling off?", "a": "Use the conscious-adjustment skill from the deficit tips above — eat what you want at the event, and balance your other meals that day or week accordingly. One off day doesn't undo weeks of consistency."}, {"category": "Deficit Execution", "q": "I keep losing motivation after a few days of tracking — what should I do?", "a": "This usually means the deficit is too aggressive or too rigid. Loosen the deficit size, simplify your meals, or revisit the flexible dieting philosophy — sustainable beats perfect every time."}, {"category": "Case 1 / Case 2 / Muscle", "q": "I'm already lean — why would I ever need a surplus?", "a": "Only if you want to build new muscle beyond what a deficit or maintenance phase allows, and you're already under roughly 10% body fat, where there's little fat-loss benefit left to chase and your body has less stored energy to draw from to support new muscle growth."}, {"category": "Case 1 / Case 2 / Muscle", "q": "How do I know what body fat percentage to actually target?", "a": "This is a personal target based on how you want to look and feel long-term — there's no universal \"correct\" number, just a tradeoff between leanness and lifestyle flexibility (energy, social eating, mood) that only you can decide for yourself."}, {"category": "Case 1 / Case 2 / Muscle", "q": "Can beginners build muscle in a deficit, or does that only work for advanced lifters?", "a": "Beginners are actually well-positioned to build muscle in a deficit, due to rapid early neuromuscular adaptations — this is one of the few populations where meaningful muscle gain in a deficit is well-documented, even at fairly aggressive deficit sizes."}, {"category": "Case 1 / Case 2 / Muscle", "q": "What happens if I stay in a deficit too long after reaching my goal?", "a": "You risk unnecessary muscle loss, lowered energy, hormonal disruption, and a miserable relationship with food, for no additional benefit. Transition to maintenance (Case 1) once you hit your target — staying in a deficit indefinitely isn't a virtue, it's just unnecessary suffering."}, {"category": "Supplements", "q": "Do I need protein powder to hit my protein target?", "a": "No — it's convenient, not required. Whole foods can hit the same target just as effectively; whey just makes it faster and easier, especially around training when you don't want a full meal."}, {"category": "Supplements", "q": "Is creatine safe for long-term use?", "a": "Yes — it's one of the most extensively studied supplements available, with a strong long-term safety record for healthy individuals across decades of research."}, {"category": "Supplements", "q": "Are fat burners or detox teas worth trying?", "a": "No. These are marketing products dressed up as shortcuts. There is no product that replaces a calorie deficit — if it worked, it would simply be a deficit in disguise, usually via mild appetite suppression, increased water loss, or a laxative effect, none of which represent real fat loss."}, {"category": "Supplements", "q": "What supplement should I actually start with if I had to pick just one?", "a": "Creatine — it has the strongest, most consistent evidence behind it of anything in this category, and it's inexpensive, simple to dose correctly, and useful regardless of your current goal."}]}, {"num": 9, "id": "section-9", "code": "S09", "title": "FINAL WORDS", "category": "CLOSE", "short": "FINAL WORDS", "intro": [{"type": "p", "text": "Two numbers. Calories and protein. That's the entire system — everything else in dieting is decoration layered on top of these two variables, designed to make a simple problem feel complicated enough to keep selling you solutions. And the single biggest mental shift in this guide: fat loss and muscle building run on separate inputs, which means you don't have to choose between them the way most people assume, and the way most fitness marketing wants you to keep believing."}, {"type": "p", "text": "Find your real maintenance, run your deficit (or hold at maintenance if you're already there), hit your protein, train properly, and stay consistent through the boring middle stretch where nothing dramatic seems to be happening — that's where most of the actual result gets built. If you want the training half of this equation built out in full, that's **The Training Protocol** — and if you want both systems built specifically around your life, that's what the **1-1 Mogward Program** is for."}], "subs": []}]};
const IMAGES = {"ledger": "data:image/webp;base64,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", "twosystems": "data:image/webp;base64,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", "discovery": "data:image/webp;base64,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", "bodyfat": "data:image/webp;base64,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", "macros": "data:image/webp;base64,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", "case": "data:image/webp;base64,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"};

/* Name printed on the completion certificate. Edit this to personalize. */
const CERTIFICATE_NAME = "Aryan";

const DISCOVERY_KEY = "mogward_diet_discovery_v1";

/* --------------------------------------------------------------------------
   Icon — thin-line SVG set echoing the reference art
   -------------------------------------------------------------------------- */
function Icon({ name, className }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    check: <polyline points="20 6 9 17 4 12" {...p} />,
    x: <g {...p}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></g>,
    plus: <g {...p}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></g>,
    minus: <line x1="5" y1="12" x2="19" y2="12" {...p} />,
    search: <g {...p}><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></g>,
    arrow: <g {...p}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></g>,
    "arrow-up": <g {...p}><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></g>,
    "arrow-down": <g {...p}><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></g>,
    reset: <g {...p}><polyline points="1 4 1 10 7 10" /><path d="M3.5 15a9 9 0 1 0 2.1-9.4L1 10" /></g>,
    lock: <g {...p}><rect x="4" y="11" width="16" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></g>,
    sparkle: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" {...p} />,
    flame: <path d="M12 3c1.5 3 4 4.5 4 8a4 4 0 1 1-8 0c0-1.2.4-2 1-2.8C8.8 9.6 9 11 10.5 11 12 11 11 7 12 3z" {...p} />,
    shield: <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" {...p} />,
    bolt: <polygon points="13 2 4 14 11 14 10 22 20 9 13 9 13 2" {...p} />,
    clock: <g {...p}><circle cx="12" cy="12" r="8" /><polyline points="12 8 12 12 15 13" /></g>,
    scale: <g {...p}><line x1="12" y1="4" x2="12" y2="20" /><line x1="6" y1="20" x2="18" y2="20" /><path d="M5 8h14" /><path d="M5 8l-2.5 5a3 3 0 0 0 5 0L5 8z" /><path d="M19 8l-2.5 5a3 3 0 0 0 5 0L19 8z" /></g>,
    dumbbell: <g {...p}><line x1="6.5" y1="12" x2="17.5" y2="12" /><rect x="3" y="9" width="3" height="6" rx="1" /><rect x="18" y="9" width="3" height="6" rx="1" /></g>,
    molecule: <g {...p}><circle cx="6" cy="9" r="2" /><circle cx="17" cy="7" r="2" /><circle cx="13" cy="16" r="2" /><line x1="7.7" y1="10" x2="11.5" y2="15" /><line x1="8" y1="8.3" x2="15" y2="7.3" /><line x1="15.6" y1="8.6" x2="13.6" y2="14.2" /></g>,
    droplet: <path d="M12 3.5c3.2 3.8 5.5 6.4 5.5 9.3A5.5 5.5 0 1 1 6.5 12.8C6.5 9.9 8.8 7.3 12 3.5z" {...p} />,
    grain: <g {...p}><line x1="12" y1="3" x2="12" y2="21" /><path d="M12 7c-1.5-1.5-4-1.5-4-1.5S8 9 12 9M12 7c1.5-1.5 4-1.5 4-1.5S16 9 12 9" /><path d="M12 12c-1.5-1.5-4-1.5-4-1.5S8 14 12 14M12 12c1.5-1.5 4-1.5 4-1.5S16 14 12 14" /></g>,
    plate: <g {...p}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /></g>,
    coffee: <g {...p}><path d="M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8z" /><path d="M17 9h2.5a2.5 2.5 0 0 1 0 5H17" /><line x1="8" y1="2.5" x2="8" y2="4.5" /><line x1="12" y1="2.5" x2="12" y2="4.5" /></g>,
    pill: <g {...p}><rect x="3.5" y="8.5" width="17" height="7" rx="3.5" /><line x1="12" y1="8.5" x2="12" y2="15.5" /></g>,
    trend: <g {...p}><polyline points="4 15 10 9 13 12 20 5" /><polyline points="20 9 20 5 16 5" /></g>,
    scoop: <g {...p}><path d="M5 10h14l-1.2 8.5a1 1 0 0 1-1 .9H7.2a1 1 0 0 1-1-.9L5 10z" /><path d="M9 10V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V10" /></g>,
    target: <g {...p}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.6" /></g>,
    user: <g {...p}><circle cx="12" cy="8" r="4" /><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" /></g>,
  };
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" style={{ width: "1em", height: "1em", display: "block" }}>
      {paths[name] || null}
    </svg>
  );
}

/* --------------------------------------------------------------------------
   RichText — inline **bold** / *italic* / `code`
   -------------------------------------------------------------------------- */
function RichText({ text }) {
  if (!text) return null;
  const parts = useMemo(() => {
    const out = []; const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g; let last = 0, m;
    while ((m = re.exec(text)) !== null) {
      if (m.index > last) out.push({ t: "text", v: text.slice(last, m.index) });
      const tok = m[0];
      if (tok.startsWith("**")) out.push({ t: "b", v: tok.slice(2, -2) });
      else if (tok.startsWith("`")) out.push({ t: "c", v: tok.slice(1, -1) });
      else out.push({ t: "i", v: tok.slice(1, -1) });
      last = m.index + tok.length;
    }
    if (last < text.length) out.push({ t: "text", v: text.slice(last) });
    return out;
  }, [text]);
  return (
    <>
      {parts.map((pt, i) =>
        pt.t === "b" ? <strong key={i}>{pt.v}</strong> :
        pt.t === "i" ? <em key={i}>{pt.v}</em> :
        pt.t === "c" ? <code key={i} className="fp-code">{pt.v}</code> :
        <React.Fragment key={i}>{pt.v}</React.Fragment>
      )}
    </>
  );
}

/* --------------------------------------------------------------------------
   Block / Blocks — generic content renderer
   -------------------------------------------------------------------------- */
function DataTable({ header, rows }) {
  return (
    <div className="fp-tablewrap">
      <table className="fp-table">
        <thead><tr>{header.map((h, i) => <th key={i}><RichText text={h} /></th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}><RichText text={c} /></td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
function Block({ b }) {
  switch (b.type) {
    case "p": return <p className="fp-p"><RichText text={b.text} /></p>;
    case "h3": return <h3 className="fp-h3">{b.text}</h3>;
    case "h4": return <h4 className="fp-h4">{b.text}</h4>;
    case "quote": return <blockquote className="fp-quote"><RichText text={b.text} /></blockquote>;
    case "code": return <pre className="fp-pre"><code>{b.text}</code></pre>;
    case "table": return <DataTable header={b.header} rows={b.rows} />;
    case "list":
      return b.ordered
        ? <ol className="fp-ol">{b.items.map((it, i) => <li key={i}><RichText text={it} /></li>)}</ol>
        : <ul className="fp-ul">{b.items.map((it, i) => <li key={i}><RichText text={it} /></li>)}</ul>;
    default: return null;
  }
}
function Blocks({ blocks }) { return <>{(blocks || []).map((b, i) => <Block key={i} b={b} />)}</>; }

/* --------------------------------------------------------------------------
   Callouts / PullQuote / HeroVisual / DisclaimerBanner
   -------------------------------------------------------------------------- */
function Callout({ kind, label, icon, children }) {
  return (
    <div className={"fp-callout fp-callout--" + kind}>
      <div className="fp-callout__label"><Icon name={icon} /> {label}</div>
      <div className="fp-callout__body">{children}</div>
    </div>
  );
}
const ScienceCallout = ({ children }) => <Callout kind="science" label="THE MECHANISM" icon="bolt">{children}</Callout>;
const PracticalCallout = ({ children, label }) => <Callout kind="practical" label={label || "DO THIS"} icon="check">{children}</Callout>;
const CautionCallout = ({ children }) => <Callout kind="caution" label="DON'T GET SCAMMED" icon="shield">{children}</Callout>;

function PullQuote({ text }) {
  return (
    <div className="fp-pullquote">
      <span className="fp-pullquote__mark">&ldquo;</span>
      <p><RichText text={text} /></p>
    </div>
  );
}
function HeroVisual({ img, alt, caption }) {
  return (
    <figure className="fp-hero">
      <div className="fp-hero__frame"><img src={IMAGES[img]} alt={alt} loading="lazy" /></div>
      {caption && <figcaption className="fp-hero__cap">{caption}</figcaption>}
    </figure>
  );
}
function DisclaimerBanner({ text }) {
  const [open, setOpen] = useState(true);
  if (!open) {
    return <button className="fp-disc fp-disc--collapsed" onClick={() => setOpen(true)}><Icon name="shield" /> MEDICAL DISCLAIMER — tap to read</button>;
  }
  return (
    <div className="fp-disc">
      <div className="fp-disc__head">
        <span className="fp-disc__tag"><Icon name="shield" /> DISCLAIMER</span>
        <button className="fp-disc__x" onClick={() => setOpen(false)} aria-label="Dismiss"><Icon name="x" /></button>
      </div>
      <p><RichText text={text} /></p>
    </div>
  );
}

/* --------------------------------------------------------------------------
   EnergyLedgerVisual (S01) — interactive recreation of the balance scale.
   Presets tip the scale: deficit / maintenance / surplus.
   -------------------------------------------------------------------------- */
const LEDGER_STATES = {
  deficit: { tilt: -9, inY: 16, outY: -16, cls: "down",
    cap: <>Energy out exceeds energy in. Your body covers the shortfall from <b className="down">stored body fat</b> — the only mechanism by which fat loss happens.</> },
  maintenance: { tilt: 0, inY: 0, outY: 0, cls: "hold",
    cap: <>Energy in equals energy out. Your bodyweight <b className="hold">holds exactly where it is</b> — this is your maintenance number.</> },
  surplus: { tilt: 9, inY: -16, outY: 16, cls: "up",
    cap: <>Energy in exceeds energy out. The excess is <b className="up">stored as new mass</b> — useful for building at scale, but not the focus here.</> },
};
function EnergyLedgerVisual() {
  const [state, setState] = useState("maintenance");
  const s = LEDGER_STATES[state];
  return (
    <div className="dp-ledger">
      <div className="dp-ledger__lbl">THE ENERGY LEDGER — TIP THE BALANCE</div>
      <div className="dp-ledger__beam" style={{ "--tilt": s.tilt + "deg", "--inY": s.outY + "px", "--outY": s.inY + "px" }}>
        <div className="dp-ledger__fulcrum" />
        <div className="dp-ledger__bar" />
        <div className="dp-ledger__pivot" />
        <div className="dp-ledger__pan dp-ledger__pan--in" style={{ "--inY": s.outY + "px" }}>
          <div className="dp-ledger__chain" />
          <div className="dp-ledger__dish"><span className="dp-ledger__ic"><Icon name="flame" /></span></div>
          <div className="dp-ledger__plbl">ENERGY OUT</div>
        </div>
        <div className="dp-ledger__pan dp-ledger__pan--out" style={{ "--outY": s.inY + "px" }}>
          <div className="dp-ledger__chain" />
          <div className="dp-ledger__dish"><span className="dp-ledger__ic"><Icon name="plate" /></span></div>
          <div className="dp-ledger__plbl">ENERGY IN</div>
        </div>
      </div>
      <div className="dp-ledger__ctrls">
        {[["deficit", "DEFICIT"], ["maintenance", "MAINTENANCE"], ["surplus", "SURPLUS"]].map(([k, lbl]) => (
          <button key={k} className={"dp-ledger__btn" + (state === k ? " is-active" : "")} onClick={() => setState(k)}>{lbl}</button>
        ))}
      </div>
      <p className="dp-ledger__cap">{s.cap}</p>
    </div>
  );
}

/* --------------------------------------------------------------------------
   TwoSystemsComparison (S01) — two click-to-expand brackets:
   fat loss (energy balance) vs muscle building (training + protein).
   -------------------------------------------------------------------------- */
const TWO_SYSTEMS = [
  { key: "fat", ic: "scale", name: "Fat Loss", driver: "Energy Balance",
    body: "Purely a function of calories in versus calories out. Nothing else moves this needle — not a specific food, not meal timing, not a metabolism trick. A sustained deficit is the singular requirement." },
  { key: "muscle", ic: "dumbbell", name: "Muscle Building", driver: "Training + Protein",
    body: "A function of progressive resistance training plus adequate protein — not of being in a surplus. Surplus calories make it easier and faster, but they are not required for the process to occur." },
];
function TwoSystemsComparison() {
  const [open, setOpen] = useState(null);
  return (
    <div className="dp-two">
      {TWO_SYSTEMS.map((c) => (
        <div key={c.key} className={"dp-two__card" + (open === c.key ? " is-open" : "")}
          onClick={() => setOpen(open === c.key ? null : c.key)} role="button" tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(open === c.key ? null : c.key); } }}>
          <span className="dp-two__bracket dp-two__bracket--l" />
          <span className="dp-two__bracket dp-two__bracket--r" />
          <div className="dp-two__ic"><Icon name={c.ic} /></div>
          <div className="dp-two__name">{c.name}</div>
          <div className="dp-two__driver">{c.driver}</div>
          <div className="dp-two__body"><div className="dp-two__bodyinner">{c.body}</div></div>
          <div className="dp-two__more">{open === c.key ? "TAP TO CLOSE" : "TAP TO EXPAND"}</div>
        </div>
      ))}
    </div>
  );
}

/* --------------------------------------------------------------------------
   MaintenanceCalculator (S02) — [ARTIFACT BUILD NOTE #1]
   bodyweight × activity multiplier (same methodology family as Frame's
   bodyweight-multiplier tools), sex-adjusted → estimated maintenance kcal.
   -------------------------------------------------------------------------- */
const ACTIVITY = [
  { key: "sed", lbl: "SEDENTARY", k: 29 },
  { key: "mod", lbl: "MODERATE", k: 34 },
  { key: "act", lbl: "ACTIVE", k: 39 },
];
function MaintenanceCalculator() {
  const [bw, setBw] = useState("80");
  const [act, setAct] = useState("mod");
  const [sex, setSex] = useState("male");
  const kg = Math.max(0, parseFloat(bw) || 0);
  const mult = ACTIVITY.find((a) => a.key === act).k;
  const sexAdj = sex === "male" ? 1 : 0.92;
  const est = Math.round((kg * mult * sexAdj) / 10) * 10;
  return (
    <div className="dp-calc">
      <div className="dp-calc__lbl">STEP 1 · MAINTENANCE-CALORIE ESTIMATE</div>
      <div className="dp-calc__grid">
        <div className="dp-field">
          <span className="dp-field__lbl">Bodyweight (kg)</span>
          <input className="dp-field__in" type="number" inputMode="decimal" value={bw} onChange={(e) => setBw(e.target.value)} min="0" />
        </div>
        <div className="dp-field">
          <span className="dp-field__lbl">Sex</span>
          <div className="dp-seg">
            {[["male", "MALE"], ["female", "FEMALE"]].map(([k, l]) => (
              <button key={k} className={"dp-seg__b" + (sex === k ? " is-active" : "")} onClick={() => setSex(k)}>{l}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="dp-field" style={{ marginTop: 14 }}>
        <span className="dp-field__lbl">Activity level</span>
        <div className="dp-seg">
          {ACTIVITY.map((a) => (
            <button key={a.key} className={"dp-seg__b" + (act === a.key ? " is-active" : "")} onClick={() => setAct(a.key)}>{a.lbl}</button>
          ))}
        </div>
      </div>
      <div className="dp-calc__out">
        <span className="dp-calc__big">{est ? est.toLocaleString() : "—"}</span>
        <span className="dp-calc__unit">KCAL / DAY · ESTIMATED MAINTENANCE</span>
      </div>
      <p className="dp-calc__note">A starting guideline, not your real maintenance. Confirm it against your own bodyweight trend with the 1-week discovery protocol below.</p>
    </div>
  );
}

/* --------------------------------------------------------------------------
   WeeklyDiscoveryTracker (S02) — [ARTIFACT BUILD NOTE — discovery tool]
   7-day morning-weight log persisted via window.storage; computes the trend
   and routes to one of three outcomes (up / hold / down).
   -------------------------------------------------------------------------- */
const DAY_LBLS = ["D1", "D2", "D3", "D4", "D5", "D6", "D7"];
function WeeklyDiscoveryTracker() {
  const [days, setDays] = useState(null); // null = loading
  const [saved, setSaved] = useState(true);
  const [err, setErr] = useState(false);

  useEffect(() => {
    let live = true;
    (async () => {
      try {
        const res = await window.storage.get(DISCOVERY_KEY, false);
        if (!live) return;
        if (res && res.value) setDays(JSON.parse(res.value));
        else setDays(["", "", "", "", "", "", ""]);
      } catch (e) { if (live) setDays(["", "", "", "", "", "", ""]); }
    })();
    return () => { live = false; };
  }, []);

  function edit(i, v) {
    setDays((prev) => prev.map((d, di) => (di === i ? v : d)));
    setSaved(false);
  }
  async function persist() {
    try { await window.storage.set(DISCOVERY_KEY, JSON.stringify(days), false); setSaved(true); setErr(false); }
    catch (e) { setErr(true); setSaved(true); }
  }
  async function reset() {
    const blank = ["", "", "", "", "", "", ""];
    setDays(blank);
    try { await window.storage.set(DISCOVERY_KEY, JSON.stringify(blank), false); setErr(false); } catch (e) { setErr(true); }
    setSaved(true);
  }

  if (!days) return <div className="fp-track fp-track--loading">Loading your tracker…</div>;

  const nums = days.map((d) => parseFloat(d)).filter((n) => !isNaN(n));
  const enough = nums.length >= 4;
  const avg = nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
  // trend = mean of the later half minus the earlier half of entered values
  let outcome = null;
  if (enough) {
    const half = Math.floor(nums.length / 2);
    const early = nums.slice(0, half);
    const late = nums.slice(nums.length - half);
    const delta = (late.reduce((a, b) => a + b, 0) / late.length) - (early.reduce((a, b) => a + b, 0) / early.length);
    if (delta > 0.2) outcome = {
      mod: "up", ic: "arrow-up", title: "Scale trending up → maintenance is LOWER",
      body: "Your real maintenance is below the estimate. Lower your calorie target for next week, then re-run the week." };
    else if (delta < -0.2) outcome = {
      mod: "down", ic: "arrow-down", title: "Scale trending down → you're in a deficit",
      body: "Your real maintenance is higher than the estimate — you're already losing without trying. Keep going, or adjust for a faster rate." };
    else outcome = {
      mod: "hold", ic: "minus", title: "Scale holding steady → true maintenance found",
      body: "Energy in is matching energy out. This is your real maintenance number — the anchor every target is set from." };
  }
  return (
    <div className={"dp-disc" + (outcome ? " dp-disc--" + outcome.mod : "")}>
      <div className="dp-disc__lbl">STEP 2 · 1-WEEK DISCOVERY PROTOCOL — LOG MORNING WEIGHT</div>
      <div className="dp-disc__days">
        {days.map((d, i) => (
          <div key={i} className="dp-disc__day">
            <span className="dp-disc__dn">{DAY_LBLS[i]}</span>
            <input className="dp-disc__in" type="number" inputMode="decimal" placeholder="–" value={d} onChange={(e) => edit(i, e.target.value)} />
          </div>
        ))}
      </div>
      <div className="dp-disc__row">
        <button className="dp-disc__save" onClick={persist}>{saved ? "SAVED" : "SAVE WEEK"}</button>
        <button className="dp-disc__reset" onClick={reset}><Icon name="reset" /> RESET</button>
        {nums.length > 0 && <span className="dp-disc__avg">7-DAY AVG <b>{avg.toFixed(1)} kg</b></span>}
      </div>
      {outcome ? (
        <div className="dp-disc__outcome">
          <span className="dp-disc__oic"><Icon name={outcome.ic} /></span>
          <div><p className="dp-disc__otitle">{outcome.title}</p><p className="dp-disc__obody">{outcome.body}</p></div>
        </div>
      ) : (
        <p className="dp-disc__hint">Enter at least 4 mornings (same time, after the bathroom, before eating) to read your trend. {err ? "Saved locally only." : "Saved automatically when you tap save."}</p>
      )}
    </div>
  );
}

/* --------------------------------------------------------------------------
   BodyFatTargetSelector (S02) — [ARTIFACT BUILD NOTE #2]
   Reuses the Frame Protocol body-fat bands. Selecting a band fills the vessel
   and feeds the protein multiplier (auto 2.0x under ~12%). Controlled: the
   parent (S02) owns sex + band so ProteinCalculator reads the same selection.
   -------------------------------------------------------------------------- */
const BF_BANDS = {
  male: [
    { range: "25%+", rep: 28, name: "High", desc: "Structure fully obscured — the covering hides the frame underneath." },
    { range: "20–24%", rep: 22, name: "Soft", desc: "Some definition hidden; outline is rounded rather than sharp." },
    { range: "15–19%", rep: 17, name: "Average", desc: "Moderate definition — the most common starting point." },
    { range: "Under 15%", rep: 13, name: "Lean", desc: "Visible definition and a clear jawline. A common long-term target.", target: true },
    { range: "10–12%", rep: 11, name: "Very lean", desc: "Sharp, separated detail. Below ~12% protein steps up to 2.0x." },
  ],
  female: [
    { range: "32%+", rep: 35, name: "High", desc: "Structure fully obscured — the covering hides the frame underneath." },
    { range: "28–31%", rep: 29, name: "Soft", desc: "Some definition hidden; outline is rounded rather than sharp." },
    { range: "23–27%", rep: 25, name: "Average", desc: "Moderate definition — the most common starting point." },
    { range: "18–22%", rep: 20, name: "Lean", desc: "Visible tone and a defined silhouette. A common long-term target.", target: true },
    { range: "16–17%", rep: 16, name: "Very lean", desc: "Sharp, athletic detail near the lower healthy bound." },
  ],
};
function BodyFatTargetSelector({ sex, setSex, bandIdx, setBandIdx }) {
  const bands = BF_BANDS[sex];
  const sel = bands[bandIdx];
  const fillPct = Math.min(96, Math.max(8, sel.rep * 2.6)); // map bf% -> visible fill height
  const under12 = sel.rep < 12;
  return (
    <div className="dp-bfs">
      <div className="dp-bfs__lbl">BODY-FAT TARGET — PICK YOUR LONG-TERM LEVEL</div>
      <div className="dp-bfs__toggle">
        {[["male", "MEN"], ["female", "WOMEN"]].map(([k, l]) => (
          <button key={k} className={"dp-bfs__tg" + (sex === k ? " is-active" : "")} onClick={() => { setSex(k); setBandIdx(Math.min(bandIdx, BF_BANDS[k].length - 1)); }}>{l}</button>
        ))}
      </div>
      <div className="dp-bfs__vessel">
        <span className="dp-bfs__pct">{sel.rep}%</span>
        <div className="dp-bfs__fill" style={{ height: fillPct + "%" }} />
        <div className="dp-bfs__cap" style={{ bottom: fillPct + "%" }} />
      </div>
      <div className="dp-bfs__rows">
        {bands.map((b, i) => (
          <button key={i} className={"dp-bfs__band" + (i === bandIdx ? " is-active" : "")} onClick={() => setBandIdx(i)}>
            <span className="dp-bfs__brange">{b.range}</span>
            <span>
              <span className="dp-bfs__bname">{b.name}{b.target ? " · common target" : ""}</span>
              <span className="dp-bfs__bdesc">{b.desc}</span>
            </span>
          </button>
        ))}
      </div>
      <div className="dp-bfs__feed">
        Feeds your protein multiplier → <b>{under12 ? "2.0x" : "1.8x"}</b> {under12 ? "(under ~12% body fat — slightly higher protein protects muscle in a deficit)" : "(standard until you drop under ~12%)"}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   ProteinCalculator (S02) — grams/day = bodyweight(kg) × multiplier.
   Multiplier auto-switches to 2.0x under ~12% body fat (from the selector).
   -------------------------------------------------------------------------- */
function ProteinCalculator({ under12 }) {
  const [bw, setBw] = useState("75");
  const kg = Math.max(0, parseFloat(bw) || 0);
  const mult = under12 ? 2.0 : 1.8;
  const grams = Math.round(kg * mult);
  const low = Math.round(kg * 1.8);
  const high = Math.round(kg * 2.0);
  return (
    <div className="dp-calc">
      <div className="dp-calc__lbl">PROTEIN TARGET · 1.8x–2.0x BODYWEIGHT (KG)</div>
      <div className="dp-calc__grid">
        <div className="dp-field">
          <span className="dp-field__lbl">Bodyweight (kg)</span>
          <input className="dp-field__in" type="number" inputMode="decimal" value={bw} onChange={(e) => setBw(e.target.value)} min="0" />
        </div>
        <div className="dp-field">
          <span className="dp-field__lbl">Multiplier (auto)</span>
          <div className="dp-calc__out" style={{ marginTop: 0, padding: "10px 12px" }}>
            <span className="dp-calc__big" style={{ fontSize: 22 }}>{mult.toFixed(1)}x</span>
            <span className="dp-calc__unit">{under12 ? "UNDER 12% BF" : "STANDARD"}</span>
          </div>
        </div>
      </div>
      <div className="dp-calc__out">
        <span className="dp-calc__big">{grams || "—"}</span>
        <span className="dp-calc__unit">G PROTEIN / DAY</span>
        <span className="dp-calc__range">range {low}–{high}g</span>
      </div>
      <p className="dp-calc__note">More is not better. Past this range, extra protein just eats into your calorie budget with no added muscle benefit.</p>
    </div>
  );
}

/* --------------------------------------------------------------------------
   MacroBreakdownChart (S03) — three horizontal bars, live recalc.
   Defaults reproduce the doc's worked example exactly:
   90kg man @ 2,400 kcal → 162g protein / 59g fat / 306g carbs.
   -------------------------------------------------------------------------- */
function MacroBreakdownChart() {
  const [cals, setCals] = useState("2400");
  const [protein, setProtein] = useState("162");
  const [fatPct, setFatPct] = useState("22");
  const C = Math.max(0, parseFloat(cals) || 0);
  const P = Math.max(0, parseFloat(protein) || 0);
  const fp = Math.min(40, Math.max(0, parseFloat(fatPct) || 0));
  const pKcal = P * 4;
  const fKcal = C * (fp / 100);
  const fG = Math.round(fKcal / 9);
  const cKcal = Math.max(0, C - pKcal - fKcal);
  const cG = Math.round(cKcal / 4);
  const pPct = C ? Math.round((pKcal / C) * 100) : 0;
  const fPctOut = C ? Math.round((fKcal / C) * 100) : 0;
  const cPct = C ? Math.max(0, 100 - pPct - fPctOut) : 0;
  const rows = [
    { ic: "molecule", name: "Protein", g: Math.round(P), pct: pPct, fill: "p", note: "set first" },
    { ic: "droplet", name: "Fat", g: fG, pct: fPctOut, fill: "f", note: fp + "% of kcal" },
    { ic: "grain", name: "Carbs", g: cG, pct: cPct, fill: "c", note: "the remainder" },
  ];
  return (
    <div className="dp-macro">
      <div className="dp-macro__lbl">MACRO BREAKDOWN — PROTEIN FIRST, FAT SECOND, CARBS FILL THE REST</div>
      <div className="dp-calc__grid" style={{ marginBottom: 18 }}>
        <div className="dp-field"><span className="dp-field__lbl">Total kcal</span>
          <input className="dp-field__in" type="number" inputMode="numeric" value={cals} onChange={(e) => setCals(e.target.value)} /></div>
        <div className="dp-field"><span className="dp-field__lbl">Protein (g)</span>
          <input className="dp-field__in" type="number" inputMode="numeric" value={protein} onChange={(e) => setProtein(e.target.value)} /></div>
        <div className="dp-field"><span className="dp-field__lbl">Fat (% of kcal)</span>
          <input className="dp-field__in" type="number" inputMode="numeric" value={fatPct} onChange={(e) => setFatPct(e.target.value)} /></div>
      </div>
      <div className="dp-macro__bars">
        {rows.map((r) => (
          <div key={r.name} className="dp-macro__bar">
            <div className="dp-macro__bhead">
              <span className="dp-macro__bname"><span className="dp-macro__bic"><Icon name={r.ic} /></span>{r.name} <span style={{ color: "var(--text-muted)", fontWeight: 400, fontFamily: "var(--font-mono)", fontSize: 10 }}>· {r.note}</span></span>
              <span className="dp-macro__bval"><b>{r.g}g</b> &nbsp;{r.pct}%</span>
            </div>
            <div className="dp-macro__track">
              <div className={"dp-macro__fill dp-macro__fill--" + r.fill} style={{ width: Math.max(3, r.pct) + "%" }}>
                <span className="dp-macro__pct">{r.pct}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="dp-macro__foot">
        <span>PROTEIN <b>{Math.round(pKcal)}</b> kcal</span>
        <span>FAT <b>{Math.round(fKcal)}</b> kcal</span>
        <span>CARBS <b>{Math.round(cKcal)}</b> kcal</span>
      </div>
      <p className="dp-macro__ex">Worked example — 90kg man at 2,400 kcal: 162g protein (1.8x) · 59g fat (22%) · 306g carbs. That's the entire process, every time.</p>
    </div>
  );
}

/* --------------------------------------------------------------------------
   PreWorkoutTimingCard (S03) — toggle between the two timing windows.
   -------------------------------------------------------------------------- */
function PreWorkoutTimingCard({ windows }) {
  const [tab, setTab] = useState(0);
  if (!windows || !windows.length) return null;
  const w = windows[tab];
  return (
    <div className="dp-pwt">
      <div className="dp-pwt__tabs">
        {windows.map((win, i) => (
          <button key={i} className={"dp-pwt__tab" + (tab === i ? " is-active" : "")} onClick={() => setTab(i)}>
            <Icon name="clock" /> {win.window.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="dp-pwt__body">
        <p className="dp-pwt__guide"><RichText text={w.guidance} /></p>
        <div className="dp-pwt__exlbl">EXAMPLE MEALS</div>
        {w.examples.map((ex, i) => (
          <div key={i} className="dp-pwt__ex"><span className="dp-pwt__exn">0{i + 1}</span><span><RichText text={ex} /></span></div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   CaseDecisionTree (S04) — one branching question reveals the relevant case.
   -------------------------------------------------------------------------- */
function CaseDecisionTree({ case1, case2 }) {
  const [choice, setChoice] = useState(null);
  return (
    <div className="dp-case">
      <div className="dp-case__q">
        <div className="dp-case__qlbl">THE ONLY QUESTION THAT MATTERS</div>
        <p className="dp-case__qtxt">Are you already at your target body fat percentage?</p>
        <div className="dp-case__choices">
          <button className={"dp-case__choice" + (choice === 1 ? " is-active" : "")} onClick={() => setChoice(1)}>
            <div className="dp-case__cn">CASE 1</div><div className="dp-case__ct">Yes — I'm lean enough</div>
          </button>
          <button className={"dp-case__choice" + (choice === 2 ? " is-active" : "")} onClick={() => setChoice(2)}>
            <div className="dp-case__cn">CASE 2</div><div className="dp-case__ct">Not lean enough yet</div>
          </button>
        </div>
      </div>

      {choice === 1 && (
        <div className="dp-case__panel">
          <span className="dp-case__ptag">CASE 1 · MAINTENANCE</span>
          <h4 className="dp-case__ph">You are already lean enough</h4>
          <div className="dp-case__stats">
            <div className="dp-case__stat"><div className="dp-case__sk">Strategy</div><div className="dp-case__sv">Maintenance</div></div>
            <div className="dp-case__stat"><div className="dp-case__sk">Protein</div><div className="dp-case__sv">1.8x</div></div>
            <div className="dp-case__stat"><div className="dp-case__sk">Duration</div><div className="dp-case__sv">Long-term</div></div>
          </div>
          {case1 && <Blocks blocks={case1.blocks} />}
        </div>
      )}

      {choice === 2 && (
        <div className="dp-case__panel">
          <span className="dp-case__ptag">CASE 2 · DEFICIT</span>
          <h4 className="dp-case__ph">You are not lean enough yet</h4>
          <div className="dp-case__stats">
            <div className="dp-case__stat"><div className="dp-case__sk">Deficit size</div><div className="dp-case__sv">200–700</div></div>
            <div className="dp-case__stat"><div className="dp-case__sk">Extra lever</div><div className="dp-case__sv">Cardio</div></div>
            <div className="dp-case__stat"><div className="dp-case__sk">Duration</div><div className="dp-case__sv">Until target BF</div></div>
          </div>
          {case2 && <Blocks blocks={case2.blocks} />}
        </div>
      )}
    </div>
  );
}

/* --------------------------------------------------------------------------
   DeficitTacticsList (S05) — four tactics with worked examples.
   -------------------------------------------------------------------------- */
function DeficitTacticsList({ tactics }) {
  return (
    <div className="dp-tac">
      {tactics.map((t) => (
        <div key={t.n} className="dp-tac__item">
          <div className="dp-tac__head"><span className="dp-tac__n">{t.n}</span><span className="dp-tac__title">{t.title}</span></div>
          <div className="dp-tac__body"><RichText text={t.body} /></div>
          {t.worked && <div className="dp-tac__worked"><b>Worked example</b><RichText text={t.worked} /></div>}
        </div>
      ))}
    </div>
  );
}

/* --------------------------------------------------------------------------
   SupplementTierList (S06) — worth it / convenience / general health / skip.
   -------------------------------------------------------------------------- */
const TIER_META = [
  { key: "worth_it", lbl: "WORTH IT", badge: "STRONG EVIDENCE" },
  { key: "convenience", lbl: "CONVENIENCE", badge: "USEFUL, NOT MAGIC" },
  { key: "health", lbl: "GENERAL HEALTH", badge: "HEALTH, NOT PHYSIQUE" },
  { key: "skip", lbl: "OVERPRICED — SKIP", badge: "MARKETING MARKUP" },
];
function SupplementTierList({ supps }) {
  return (
    <div className="dp-supp">
      {TIER_META.map((tier) => {
        const items = supps.filter((s) => s.tier === tier.key);
        if (!items.length) return null;
        return (
          <div key={tier.key} className={"dp-supp__tier dp-supp--" + tier.key}>
            <div className="dp-supp__th">
              <span className="dp-supp__badge">{tier.badge}</span>
              <span className="dp-supp__tlbl">{tier.lbl}</span>
            </div>
            <div className="dp-supp__items">
              {items.map((s, i) => (
                <div key={i} className="dp-supp__item">
                  <div className="dp-supp__name">{s.name}</div>
                  <div className="dp-supp__detail"><RichText text={s.detail} /></div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* --------------------------------------------------------------------------
   DietExampleBrowser (S07) — all 11 examples with live filters.
   -------------------------------------------------------------------------- */
const BF_FILTERS = [
  { key: "all", lbl: "ALL BF", test: () => true },
  { key: "high", lbl: "20%+", test: (e) => e.bf >= 20 },
  { key: "mid", lbl: "12–19%", test: (e) => e.bf >= 12 && e.bf < 20 },
  { key: "low", lbl: "UNDER 12%", test: (e) => e.bf < 12 },
];
function DietExampleBrowser({ examples }) {
  const [sex, setSex] = useState("all");
  const [cas, setCas] = useState("all");
  const [bff, setBff] = useState("all");
  const bfTest = BF_FILTERS.find((f) => f.key === bff).test;
  const shown = examples.filter((e) =>
    (sex === "all" || e.sex === sex) &&
    (cas === "all" || e.case === cas) &&
    bfTest(e)
  );
  const Chip = ({ active, onClick, children }) => (
    <button className={"dp-ex__chip" + (active ? " is-active" : "")} onClick={onClick}>{children}</button>
  );
  return (
    <div className="dp-ex">
      <div className="dp-ex__filters">
        <div className="dp-ex__frow">
          <span className="dp-ex__flbl">Sex</span>
          {[["all", "ALL"], ["Male", "MALE"], ["Female", "FEMALE"]].map(([k, l]) => (
            <Chip key={k} active={sex === k} onClick={() => setSex(k)}>{l}</Chip>
          ))}
        </div>
        <div className="dp-ex__frow">
          <span className="dp-ex__flbl">Case</span>
          {[["all", "ALL"], ["Case 1", "CASE 1"], ["Case 2", "CASE 2"]].map(([k, l]) => (
            <Chip key={k} active={cas === k} onClick={() => setCas(k)}>{l}</Chip>
          ))}
        </div>
        <div className="dp-ex__frow">
          <span className="dp-ex__flbl">Body fat</span>
          {BF_FILTERS.map((f) => (
            <Chip key={f.key} active={bff === f.key} onClick={() => setBff(f.key)}>{f.lbl}</Chip>
          ))}
        </div>
      </div>
      <div className="dp-ex__count">SHOWING <b>{shown.length}</b> OF {examples.length} EXAMPLES</div>
      {shown.length === 0 ? (
        <div className="dp-ex__empty">No examples match those filters. Loosen one to see results.</div>
      ) : (
        <div className="dp-ex__grid">
          {shown.map((e) => (
            <div key={e.n} className="dp-ex__card">
              <div className="dp-ex__ctop">
                <span className="dp-ex__cn">{e.n}</span>
                <span className="dp-ex__tag">{e.sex}</span>
                <span className={"dp-ex__tag " + (e.case === "Case 1" ? "dp-ex__tag--case1" : "dp-ex__tag--case2")}>{e.case}</span>
                <span className="dp-ex__tag">{e.bf}% BF</span>
              </div>
              <div className="dp-ex__ctx"><RichText text={e.context} /></div>
              <div className="dp-ex__nums">
                <div className="dp-ex__num"><div className="dp-ex__nk">Calories</div><div className="dp-ex__nv">{e.kcal}</div><div className="dp-ex__nu">kcal</div></div>
                <div className="dp-ex__num"><div className="dp-ex__nk">Protein</div><div className="dp-ex__nv">{e.protein}</div><div className="dp-ex__nu">grams</div></div>
              </div>
              <div className="dp-ex__form">{e.formula}</div>
              <div className="dp-ex__meals"><b>Example day</b><RichText text={e.meals} /></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* --------------------------------------------------------------------------
   FAQAccordion — category tabs + search + accordion
   -------------------------------------------------------------------------- */
function FAQAccordion({ faqs }) {
  const cats = useMemo(() => ["ALL", ...Array.from(new Set(faqs.map((f) => f.category)))], [faqs]);
  const [cat, setCat] = useState("ALL");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(-1);
  const filtered = faqs.filter((f) => {
    const inCat = cat === "ALL" || f.category === cat;
    const s = q.trim().toLowerCase();
    const inQ = !s || f.q.toLowerCase().includes(s) || f.a.toLowerCase().includes(s);
    return inCat && inQ;
  });
  const shortCat = (c) => c.replace(/\s*\/.*$/, "").replace(/\s*\(.*?\)\s*/g, "").trim();
  return (
    <div className="fp-faq">
      <div className="fp-faq__search">
        <Icon name="search" />
        <input value={q} onChange={(e) => { setQ(e.target.value); setOpen(-1); }} placeholder="Search all questions…" />
        {q && <button onClick={() => setQ("")} aria-label="Clear"><Icon name="x" /></button>}
      </div>
      <div className="fp-faq__tabs">
        {cats.map((c) => (
          <button key={c} className={"fp-faq__tab" + (cat === c ? " is-on" : "")} onClick={() => { setCat(c); setOpen(-1); }}>
            {c === "ALL" ? "ALL" : shortCat(c)}
          </button>
        ))}
      </div>
      <div className="fp-faq__list">
        {filtered.length === 0 && <p className="fp-faq__empty">No questions match &ldquo;{q}&rdquo;. Try another term.</p>}
        {filtered.map((f, i) => (
          <div key={i} className={"fp-faq__item" + (open === i ? " is-open" : "")}>
            <button className="fp-faq__q" onClick={() => setOpen(open === i ? -1 : i)}>
              <span>{f.q}</span><Icon name={open === i ? "minus" : "plus"} />
            </button>
            {open === i && (
              <div className="fp-faq__a">
                <span className="fp-faq__cat">{shortCat(f.category)}</span>
                <p><RichText text={f.a} /></p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Cross-sells (S09) + CompletionBadge + SectionHeader
   -------------------------------------------------------------------------- */
function UpsellCard({ tag, name, desc, cta }) {
  return (
    <div className="fp-upsell">
      <span className="fp-upsell__tag">{tag || "RECOMMENDED NEXT"}</span>
      <h4 className="fp-upsell__name">{name}</h4>
      <p className="fp-upsell__desc"><RichText text={desc} /></p>
      <Link href="/dashboard/products/6a2d29efa993b7307f224524" className="fp-upsell__cta" style={{textDecoration:"none"}}>{cta} <Icon name="arrow" /></Link>
    </div>
  );
}
function CoachingCrossSell() {
  return (
    <div className="dp-coach">
      <span className="dp-coach__tag"><Icon name="user" /> 1-1 · BY APPLICATION</span>
      <h4 className="dp-coach__name">The 1-1 Mogward Program</h4>
      <p className="dp-coach__desc">Both systems — diet and training — built around your specific life: your food culture, schedule, preferences, and goals. Not a guide. A direct, personalized coaching relationship for people who want the whole thing handled from the start.</p>
      <Link href="/" className="dp-coach__cta" style={{textDecoration:"none"}}>APPLY FOR 1-1 COACHING <Icon name="arrow" /></Link>
    </div>
  );
}
function CompletionBadge({ show, date, total }) {
  return (
    <div className={"fp-badge" + (show ? " is-on" : " is-locked")}>
      {show ? (
        <>
          <div className="fp-badge__seal"><Icon name="sparkle" /></div>
          <div className="fp-badge__title">DIET PROTOCOL CERTIFIED</div>
          <div className="fp-badge__awarded">AWARDED TO</div>
          <div className="fp-badge__name">{CERTIFICATE_NAME}</div>
          <div className="fp-badge__line" />
          <div className="fp-badge__sub">MOGWARD · {date}</div>
        </>
      ) : (
        <>
          <div className="fp-badge__seal fp-badge__seal--lock"><Icon name="lock" /></div>
          <div className="fp-badge__title">CERTIFICATE LOCKED</div>
          <div className="fp-badge__sub">Mark all {total} sections as read to unlock.</div>
        </>
      )}
    </div>
  );
}
function SectionHeader({ code, category, title }) {
  return (
    <div className="fp-sechead">
      <div className="fp-sechead__top"><span className="fp-sechead__code">{code}</span><span className="fp-sechead__tag">{category}</span></div>
      <h2 className="fp-sechead__title">{title}</h2>
      <div className="fp-sechead__rule" />
    </div>
  );
}

/* helpers */
const findSub = (sec, re) => (sec.subs || []).find((s) => re.test(s.title));
const SubHead = ({ title }) => <h3 className="fp-subhead">{title}</h3>;

/* --------------------------------------------------------------------------
   CaloriesProteinSection (S02) — owns shared sex + body-fat band state so the
   BodyFatTargetSelector and ProteinCalculator read the same selection. All
   source text is preserved; the four tools are placed at their logical spots.
   -------------------------------------------------------------------------- */
function CaloriesProteinSection({ section }) {
  const [sex, setSex] = useState("male");
  const [bandIdx, setBandIdx] = useState(2);
  const amount = findSub(section, /amount of calories/i);
  const protein = findSub(section, /protein/i);
  const under12 = BF_BANDS[sex][bandIdx].rep < 12;
  return (
    <>
      <Blocks blocks={section.intro} />
      {amount && (
        <>
          <SubHead title={amount.title} />
          <Blocks blocks={amount.blocks} />
        </>
      )}
      <MaintenanceCalculator />
      <HeroVisual img="discovery" alt="A ring of seven daily nodes resolving into three trend outcomes"
        caption="The 1-week discovery protocol: seven daily weigh-ins resolve into one of three outcomes — eat less, hold, or you're already losing." />
      <WeeklyDiscoveryTracker />
      <HeroVisual img="bodyfat" alt="Two wireframe vessels filled to different body-fat levels"
        caption="Your calorie target is a function of where your body fat is now and where you want it to be." />
      <BodyFatTargetSelector sex={sex} setSex={setSex} bandIdx={bandIdx} setBandIdx={setBandIdx} />
      {protein && (
        <>
          <SubHead title={protein.title} />
          <Blocks blocks={protein.blocks} />
        </>
      )}
      <ProteinCalculator under12={under12} />
    </>
  );
}

/* --------------------------------------------------------------------------
   SectionView — routes each section (S00–S09) to its components
   -------------------------------------------------------------------------- */
function SectionView({ section, registerRef, onToggle, completed }) {
  const { num } = section;
  let body = null;

  if (num === 0) {
    /* S00 — Welcome / the two-number system */
    body = (
      <>
        <DisclaimerBanner text={CONTENT.disclaimer} />
        <Blocks blocks={section.intro} />
        <PullQuote text="Two numbers. Calories and protein. Everything else is noise layered on top to sell you something." />
      </>
    );
  } else if (num === 1) {
    /* S01 — Energy fundamentals: ledger + two systems */
    body = (
      <>
        <HeroVisual img="ledger" alt="A balance scale weighing energy burned against food eaten"
          caption="Every day is a ledger: energy in on one side, energy out on the other. The gap is all that determines the result." />
        <Blocks blocks={section.intro} />
        <EnergyLedgerVisual />
        <ScienceCallout>Fat loss and muscle building are two separate systems with two separate inputs. One runs on energy balance; the other on training plus protein. You can withdraw from one while depositing into the other at the same time.</ScienceCallout>
        <HeroVisual img="twosystems" alt="Two bracketed systems: a balance scale and a molecule with a dumbbell"
          caption="Two accounts, not one — which is why a deficit doesn't have to cost you muscle." />
        <TwoSystemsComparison />
      </>
    );
  } else if (num === 2) {
    /* S02 — Calories + protein (stateful tools) */
    body = <CaloriesProteinSection section={section} />;
  } else if (num === 3) {
    /* S03 — Macros, meals, pre-workout timing */
    const macros = findSub(section, /setting your macros/i);
    const meals = findSub(section, /meal frequency/i);
    const pre = findSub(section, /pre-workout/i);
    body = (
      <>
        <HeroVisual img="macros" alt="Three stacked bars for protein, fat, and carbohydrate"
          caption="Every calorie is protein, carbs, or fat. Set them in order and the whole plate falls into place." />
        <Blocks blocks={section.intro} />
        {macros && (<><SubHead title={macros.title} /><Blocks blocks={macros.blocks} /></>)}
        <MacroBreakdownChart />
        {meals && (<><SubHead title={meals.title} /><Blocks blocks={meals.blocks} /></>)}
        {pre && (
          <>
            <SubHead title={pre.title} />
            <Blocks blocks={pre.blocks.filter((b) => b.type === "p" && /windows aren't rigid/i.test(b.text))} />
            <PreWorkoutTimingCard windows={section.preworkout} />
            <Blocks blocks={pre.blocks.filter((b) => b.type === "p" && /current pre-workout habits/i.test(b.text))} />
          </>
        )}
      </>
    );
  } else if (num === 4) {
    /* S04 — Diet is personal + Case 1 vs Case 2 decision tree */
    const personal = findSub(section, /diet is personal/i);
    const c1 = findSub(section, /case 1/i);
    const c2 = findSub(section, /case 2/i);
    const personalBlocks = personal ? personal.blocks : [];
    body = (
      <>
        <HeroVisual img="case" alt="Two gauges: one rewinding, one advancing"
          caption="The math is universal; the path splits in two. Find your case and the rest becomes obvious." />
        <Blocks blocks={personalBlocks} />
        <PracticalCallout label="THE FORK"><RichText text="Everything funnels into one of two cases. There's no third option, and no need to overthink which bucket you fall into." /></PracticalCallout>
        <CaseDecisionTree case1={c1} case2={c2} />
      </>
    );
  } else if (num === 5) {
    /* S05 — Executing the deficit */
    body = (
      <>
        <Blocks blocks={section.intro} />
        <DeficitTacticsList tactics={section.tactics} />
      </>
    );
  } else if (num === 6) {
    /* S06 — Supplementation */
    body = (
      <>
        <Blocks blocks={(section.intro || []).filter((b) => b.type !== "list")} />
        <SupplementTierList supps={section.supps} />
        <CautionCallout><RichText text="If someone is selling you a fat-loss product that isn't, at its core, a calorie deficit in disguise, it's a scam. No supplement changes the outcome of your diet on its own." /></CautionCallout>
      </>
    );
  } else if (num === 7) {
    /* S07 — 11 diet examples */
    body = (
      <>
        <Blocks blocks={section.intro} />
        <DietExampleBrowser examples={section.examples} />
      </>
    );
  } else if (num === 8) {
    /* S08 — FAQ */
    body = (
      <>
        <Blocks blocks={section.intro} />
        <FAQAccordion faqs={section.faqs} />
      </>
    );
  } else if (num === 9) {
    /* S09 — Final words + two distinct cross-sells */
    body = (
      <>
        <Blocks blocks={section.intro} />
        <PullQuote text="The math doesn't care what's on the plate, only what's in it." />
        <div className="dp-xsell-lbl">THE OTHER HALF OF THE EQUATION</div>
        <UpsellCard tag="THE TRAINING HALF"
          name="The Training Protocol"
          desc="No deficit saves a bad training program. This is the companion system for the training-stimulus side — how to actually train and program cardio to build or hold muscle while you lean out."
          cta="VIEW PROTOCOL" />
        <div className="dp-xsell-lbl">OR HAVE BOTH BUILT FOR YOU</div>
        <CoachingCrossSell />
      </>
    );
  }

  return (
    <section id={section.id} ref={(el) => registerRef(section.id, el)} className="fp-section">
      <SectionHeader code={section.code} category={section.category} title={section.title} />
      {body}
      {num === 8 && <CompletionBadge show={completed.all} date={completed.date} total={completed.total} />}
      <div className="fp-section__foot">
        <button className={"fp-markread" + (completed.read ? " is-done" : "")} onClick={() => onToggle(section.id)}>
          {completed.read ? <><Icon name="check" /> SECTION READ</> : "MARK AS READ"}
        </button>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   APP SHELL — header + sidebar (nav, progress, completion) + content
   -------------------------------------------------------------------------- */
export default function DietProtocol() {
  const sections = CONTENT.sections;
  const sectionRefs = useRef({});
  const contentRef = useRef(null);
  const [activeId, setActiveId] = useState(sections[0].id);
  const [manualSet, setManualSet] = useState(() => new Set());
  const [mobileNav, setMobileNav] = useState(false);

  const registerRef = useCallback((id, el) => { if (el) sectionRefs.current[id] = el; }, []);
  const completedSet = manualSet;

  /* Active section = the last section whose top has passed a trigger line near
     the top of the content area. Scroll-based (not intersection-ratio) so it
     stays correct for sections taller than the viewport. */
  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    let ticking = false;
    const compute = () => {
      ticking = false;
      const rootTop = root.getBoundingClientRect().top;
      const line = 140;
      let current = sections[0].id;
      for (const s of sections) {
        const el = sectionRefs.current[s.id];
        if (!el) continue;
        if (el.getBoundingClientRect().top - rootTop <= line) current = s.id;
      }
      setActiveId(current);
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(compute); } };
    root.addEventListener("scroll", onScroll, { passive: true });
    compute();
    return () => root.removeEventListener("scroll", onScroll);
  }, [sections]);

  const progress = Math.round((completedSet.size / sections.length) * 100);
  const allComplete = completedSet.size === sections.length;
  const date = useMemo(() => new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }), []);

  const scrollTo = (id) => {
    const el = sectionRefs.current[id];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileNav(false);
  };
  const toggle = (id) => setManualSet((prev) => {
    const n = new Set(prev);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  const activeSec = sections.find((s) => s.id === activeId) || sections[0];

  return (
    <div className="fp-app">
      <StyleSheet />

      <header className="fp-header">
        <div className="fp-header__left">
          <button className="fp-burger" onClick={() => setMobileNav((v) => !v)} aria-label="Menu"><span /><span /><span /></button>
          <div className="fp-logo"><span className="fp-logo__badge">M</span><span className="fp-logo__word">MOGWARD</span></div>
        </div>
        <div className="fp-header__right">
          <span className="fp-header__title">DIET PROTOCOL</span>
          <span className="fp-header__sec">{activeSec.code}</span>
        </div>
      </header>

      <div className="fp-layout">
        <aside className={"fp-sidebar" + (mobileNav ? " is-open" : "")}>
          <div className="fp-sidebar__pyr">
            <div className="fp-sidebar__pyrlbl">THE TWO-NUMBER SYSTEM</div>
            <div className="dp-sidecard">
              <div className="dp-sidecard__row"><span className="dp-sidecard__ic"><Icon name="flame" /></span><span className="dp-sidecard__k">01</span><span className="dp-sidecard__v">CALORIES</span></div>
              <div className="dp-sidecard__row"><span className="dp-sidecard__ic"><Icon name="molecule" /></span><span className="dp-sidecard__k">02</span><span className="dp-sidecard__v">PROTEIN</span></div>
              <div className="dp-sidecard__note">Get these two right and the rest is optional.</div>
            </div>
          </div>
          <div className="fp-sidebar__progress">
            <div className="fp-sidebar__ptop"><span>PROTOCOL PROGRESS</span><span className="fp-sidebar__pct">{progress}%</span></div>
            <div className="fp-pbar"><div className="fp-pbar__fill" style={{ width: `${progress}%` }} /></div>
            <div className="fp-sidebar__count">{completedSet.size} / {sections.length} SECTIONS READ</div>
          </div>
          <nav className="fp-nav">
            {sections.map((s) => {
              const isActive = s.id === activeId;
              const isDone = completedSet.has(s.id);
              return (
                <button key={s.id} className={"fp-nav__item" + (isActive ? " is-active" : "") + (isDone ? " is-done" : "")} onClick={() => scrollTo(s.id)}>
                  <span className="fp-nav__code">{s.code}</span>
                  <span className="fp-nav__label">{s.short}</span>
                  {isDone && <span className="fp-nav__chk"><Icon name="check" /></span>}
                </button>
              );
            })}
          </nav>
          <div className="fp-sidebar__foot">
            <button className={"fp-complete" + (allComplete ? " is-unlocked" : "")} onClick={() => scrollTo(sections[sections.length - 1].id)}>
              {allComplete ? "VIEW CERTIFICATE" : "MARK COMPLETE"}
            </button>
            {!allComplete && <p className="fp-sidebar__hint">Read all {sections.length} sections to unlock your certificate.</p>}
          </div>
        </aside>

        {mobileNav && <div className="fp-scrim" onClick={() => setMobileNav(false)} />}

        <main className="fp-content" ref={contentRef}>
          <div className="fp-content__inner">
            {sections.map((s) => (
              <SectionView key={s.id} section={s} registerRef={registerRef} onToggle={toggle}
                completed={{ read: completedSet.has(s.id), all: allComplete, date, total: sections.length }} />
            ))}
            <footer className="fp-footer"><span className="fp-logo__badge">M</span><span>MOGWARD · THE DIET PROTOCOL · v1</span></footer>
          </div>
        </main>
      </div>
    </div>
  );
}

function StyleSheet() { return <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');

.fp-app{
  --bg-primary:#0a0a0c; --bg-secondary:#111114; --bg-tertiary:#1a1a1f; --bg-hover:#22222a;
  --border-subtle:#2a2a32; --border-visible:#3a3a45;
  --text-primary:#f0f0f0; --text-secondary:#a8a3bd; --text-muted:#5f5b73;
  --accent-green-text:#4ade80; --accent-red-text:#f87171;
  --accent-primary:#9d8cf5; --accent-primary-bright:#b9aefb; --accent-primary-dim:#4f4480;
  --accent-glow:rgba(157,140,245,0.35); --border-accent:#6e5fc4;
  --accent-warn:#c9a84c; --accent-warn-bright:#e8c46a;
  --font-heading:'Space Grotesk','Inter',sans-serif; --font-body:'Inter',sans-serif; --font-mono:'JetBrains Mono',monospace;
  --radius-sm:4px; --radius-md:8px; --radius-lg:12px; --transition:150ms ease; --header-h:56px; --sidebar-w:260px;
  background:var(--bg-primary); color:var(--text-primary); font-family:var(--font-body);
  font-size:16px; line-height:1.65; min-height:100vh; -webkit-font-smoothing:antialiased;
}
.fp-app *{box-sizing:border-box;}
.fp-app button{font-family:inherit; cursor:pointer;}
.fp-code{font-family:var(--font-mono); font-size:.85em; background:var(--bg-tertiary); padding:1px 5px; border-radius:4px; color:var(--accent-primary-bright);}

/* HEADER */
.fp-header{position:fixed; top:0; left:0; right:0; height:var(--header-h); z-index:40;
  display:flex; align-items:center; justify-content:space-between; padding:0 20px;
  background:var(--bg-secondary); border-bottom:1px solid var(--border-accent);
  box-shadow:0 1px 0 var(--accent-glow), 0 6px 24px -12px var(--accent-glow);}
.fp-header__left,.fp-header__right{display:flex; align-items:center; gap:12px;}
.fp-logo{display:flex; align-items:center; gap:9px;}
.fp-logo__badge{display:grid; place-items:center; width:26px; height:26px; border-radius:6px;
  background:linear-gradient(135deg,var(--accent-primary),var(--accent-primary-dim)); color:#0a0a0c;
  font-family:var(--font-heading); font-weight:700; font-size:15px; box-shadow:0 0 14px var(--accent-glow);}
.fp-logo__word{font-family:var(--font-heading); font-weight:700; letter-spacing:.14em; font-size:15px;}
.fp-header__title{font-family:var(--font-heading); font-weight:600; letter-spacing:.16em; font-size:12px; color:var(--accent-primary-bright);}
.fp-header__sec{font-family:var(--font-mono); font-size:12px; color:var(--accent-primary); border:1px solid var(--border-accent);
  padding:3px 8px; border-radius:5px; box-shadow:0 0 10px var(--accent-glow);}
.fp-burger{display:none; flex-direction:column; gap:4px; background:none; border:none; padding:6px;}
.fp-burger span{width:20px; height:2px; background:var(--text-secondary); border-radius:2px;}

/* LAYOUT */
.fp-layout{display:flex; padding-top:var(--header-h); min-height:100vh;}
.fp-sidebar{position:fixed; top:var(--header-h); bottom:0; left:0; width:var(--sidebar-w); z-index:30;
  background:var(--bg-secondary); border-right:1px solid var(--border-subtle);
  display:flex; flex-direction:column; overflow-y:auto;}
.fp-sidebar__pyr{padding:16px 16px 8px;}
.fp-sidebar__pyrlbl,.fp-sidebar__pyrcard__lbl{font-family:var(--font-mono); font-size:9.5px; letter-spacing:.14em; color:var(--text-muted); margin-bottom:10px; text-align:center;}

/* mini pyramid (sidebar) */
.fp-pyr{display:flex; flex-direction:column; align-items:center; gap:4px;}
.fp-pyr--mini .fp-pyr__lvl{height:30px;}
.fp-pyr__lvl{position:relative; display:flex; align-items:center; justify-content:center; gap:8px;
  height:46px; border:1px solid var(--border-visible); border-radius:6px; background:var(--bg-tertiary);
  color:var(--text-secondary); transition:var(--transition); padding:0 10px; width:60%;}
.fp-pyr__lvl:hover{border-color:var(--border-accent); color:var(--text-primary);}
.fp-pyr__lvl.is-active{border-color:var(--accent-primary); color:var(--text-primary);
  background:linear-gradient(180deg,rgba(157,140,245,.18),rgba(157,140,245,.04)); box-shadow:0 0 16px var(--accent-glow);}
.fp-pyr__lvl.is-done .fp-pyr__n{color:var(--accent-green-text);}
.fp-pyr__n{font-family:var(--font-mono); font-size:13px; color:var(--accent-primary); font-weight:700;}
.fp-pyr__ic{font-size:15px; color:var(--accent-primary-bright); display:flex;}
.fp-pyr__lbl{font-size:12px; font-weight:500; white-space:nowrap;}
.fp-pyr__chk{position:absolute; right:6px; font-size:12px; color:var(--accent-green-text); display:flex;}
.fp-pyr--mini .fp-pyr__lbl{display:none;}

/* full pyramid card (S00) */
.fp-pyrcard{margin:26px 0; padding:24px; border:1px solid var(--border-accent); border-radius:var(--radius-lg);
  background:radial-gradient(120% 80% at 50% 0%, rgba(157,140,245,.12), transparent 70%), var(--bg-secondary);}
.fp-pyrcard__lbl{font-family:var(--font-mono); font-size:10px; letter-spacing:.16em; color:var(--text-muted); text-align:center; margin-bottom:16px;}
.fp-pyrcard .fp-pyr__lvl{height:54px;}

/* progress */
.fp-sidebar__progress{padding:12px 16px; border-top:1px solid var(--border-subtle);}
.fp-sidebar__ptop{display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:9.5px; letter-spacing:.12em; color:var(--text-muted); margin-bottom:7px;}
.fp-sidebar__pct{color:var(--accent-primary-bright);}
.fp-pbar{height:5px; background:var(--bg-tertiary); border-radius:3px; overflow:hidden;}
.fp-pbar__fill{height:100%; background:linear-gradient(90deg,var(--accent-primary-dim),var(--accent-primary-bright)); box-shadow:0 0 10px var(--accent-glow); transition:width .4s ease;}
.fp-sidebar__count{font-family:var(--font-mono); font-size:9.5px; color:var(--text-muted); margin-top:7px; letter-spacing:.1em;}

/* nav */
.fp-nav{display:flex; flex-direction:column; padding:8px; gap:2px; flex:1;}
.fp-nav__item{position:relative; display:flex; align-items:center; gap:10px; padding:9px 10px; border:none;
  background:none; border-radius:6px; text-align:left; color:var(--text-secondary); transition:var(--transition); border-left:2px solid transparent;}
.fp-nav__item:hover{background:var(--bg-hover); color:var(--text-primary);}
.fp-nav__item.is-active{background:var(--bg-tertiary); color:var(--text-primary); border-left-color:var(--accent-primary);}
.fp-nav__code{font-family:var(--font-mono); font-size:11px; color:var(--accent-primary-dim); width:30px; flex-shrink:0;}
.fp-nav__item.is-active .fp-nav__code{color:var(--accent-primary-bright);}
.fp-nav__item.is-done .fp-nav__code{color:var(--accent-green-text);}
.fp-nav__label{font-size:12px; font-weight:500; letter-spacing:.04em; line-height:1.25;}
.fp-nav__chk{margin-left:auto; font-size:13px; color:var(--accent-green-text); display:flex;}

/* sidebar foot */
.fp-sidebar__foot{padding:14px 16px 18px; border-top:1px solid var(--border-subtle);}
.fp-complete{width:100%; padding:11px; border:1px solid var(--border-accent); border-radius:8px; background:var(--bg-tertiary);
  color:var(--accent-primary-bright); font-family:var(--font-heading); font-weight:600; letter-spacing:.12em; font-size:12px; transition:var(--transition);}
.fp-complete:hover{background:var(--bg-hover); box-shadow:0 0 16px var(--accent-glow);}
.fp-complete.is-unlocked{background:linear-gradient(135deg,var(--accent-primary),var(--accent-primary-dim)); color:#0a0a0c; border-color:transparent; box-shadow:0 0 20px var(--accent-glow);}
.fp-sidebar__hint{font-size:10.5px; color:var(--text-muted); margin:9px 0 0; line-height:1.4;}

/* CONTENT */
.fp-content{margin-left:var(--sidebar-w); flex:1; height:calc(100vh - var(--header-h)); overflow-y:auto; scroll-behavior:smooth;}
.fp-content__inner{max-width:860px; margin:0 auto; padding:40px 60px 120px;}
.fp-section{padding:34px 0 26px; border-bottom:1px solid var(--border-subtle); scroll-margin-top:20px;}

/* section header */
.fp-sechead{margin-bottom:22px;}
.fp-sechead__top{display:flex; align-items:center; gap:12px; margin-bottom:10px;}
.fp-sechead__code{font-family:var(--font-mono); font-size:18px; color:var(--accent-primary); font-weight:600; text-shadow:0 0 14px var(--accent-glow);}
.fp-sechead__tag{font-family:var(--font-mono); font-size:10px; letter-spacing:.16em; color:var(--accent-primary-bright);
  border:1px solid var(--border-accent); padding:3px 9px; border-radius:20px;}
.fp-sechead__title{font-family:var(--font-heading); font-size:30px; font-weight:700; line-height:1.1; margin:0 0 14px; letter-spacing:-.01em;}
.fp-sechead__rule{height:1px; background:linear-gradient(90deg,var(--accent-primary),transparent);}
.fp-subhead{font-family:var(--font-heading); font-size:20px; font-weight:600; margin:30px 0 12px; color:var(--text-primary);}

/* prose */
.fp-p{margin:0 0 15px; color:var(--text-primary);}
.fp-h3{font-family:var(--font-heading); font-size:18px; font-weight:600; margin:24px 0 10px;}
.fp-h4{font-family:var(--font-heading); font-size:15px; font-weight:600; margin:18px 0 8px; color:var(--text-secondary); letter-spacing:.02em;}
/* bold lead-ins read as highlighted mini-headings */
.fp-app strong, .fp-app b{color:var(--accent-primary-bright); font-weight:700;}
/* unordered lists — clearly visible glowing violet bullets */
.fp-ul{list-style:none; margin:0 0 16px; padding-left:24px;}
.fp-ul li{position:relative; margin-bottom:9px; line-height:1.6;}
.fp-ul li::before{content:""; position:absolute; left:-18px; top:9px; width:6px; height:6px; border-radius:50%; background:var(--accent-primary-bright); box-shadow:0 0 8px var(--accent-glow);}
/* ordered lists — accent mono numerals */
.fp-ol{margin:0 0 16px; padding-left:26px;}
.fp-ol li{margin-bottom:9px; line-height:1.6; padding-left:2px;}
.fp-ol li::marker{color:var(--accent-primary-bright); font-family:var(--font-mono); font-weight:700;}
.fp-quote{margin:16px 0; padding:14px 18px; border-left:3px solid var(--accent-primary-dim); background:var(--bg-secondary); border-radius:0 8px 8px 0; color:var(--text-secondary);}
.fp-pre{background:var(--bg-secondary); border:1px solid var(--border-subtle); border-radius:8px; padding:14px; overflow-x:auto; font-family:var(--font-mono); font-size:13px; margin:0 0 16px;}
.fp-checklist{list-style:none; margin:0 0 16px; padding:0;}
.fp-checklist li{display:flex; gap:10px; align-items:flex-start; margin-bottom:9px;}
.fp-checklist__box{flex-shrink:0; width:20px; height:20px; border-radius:5px; display:grid; place-items:center; font-size:13px; background:rgba(157,140,245,.12); color:var(--accent-primary-bright); border:1px solid var(--border-accent); margin-top:1px;}

/* table */
.fp-tablewrap{overflow-x:auto; margin:0 0 18px; border:1px solid var(--border-subtle); border-radius:var(--radius-md);}
.fp-table{width:100%; border-collapse:collapse; font-size:13.5px; min-width:480px;}
.fp-table th{background:var(--bg-tertiary); text-align:left; padding:11px 14px; font-family:var(--font-mono); font-size:10.5px; letter-spacing:.08em; color:var(--accent-primary-bright); text-transform:uppercase; border-bottom:1px solid var(--border-visible);}
.fp-table td{padding:11px 14px; border-bottom:1px solid var(--border-subtle); color:var(--text-secondary); vertical-align:top;}
.fp-table tr:last-child td{border-bottom:none;}

/* hero */
.fp-hero{margin:0 0 22px;}
.fp-hero__frame{position:relative; border:1px solid var(--border-accent); border-radius:var(--radius-lg); overflow:hidden;
  box-shadow:0 0 40px -8px var(--accent-glow); background:#000;}
.fp-hero__frame::after{content:""; position:absolute; inset:0; box-shadow:inset 0 0 60px -20px var(--accent-glow); pointer-events:none;}
.fp-hero__frame img{width:100%; display:block;}
.fp-hero__cap{font-size:12.5px; font-style:italic; color:var(--text-muted); margin-top:9px; text-align:center; line-height:1.5;}

/* callouts */
.fp-callout{margin:16px 0; padding:15px 18px; border-radius:var(--radius-md); background:var(--bg-secondary); border-left:3px solid var(--accent-primary);}
.fp-callout--practical{background:var(--bg-tertiary); border-left-color:var(--accent-primary-bright);}
.fp-callout--caution{border-left-color:var(--accent-warn); background:rgba(201,168,76,.06);}
.fp-callout--science{border-left-color:var(--accent-primary);}
.fp-callout__label{display:flex; align-items:center; gap:7px; font-family:var(--font-mono); font-size:10.5px; letter-spacing:.14em; margin-bottom:8px; color:var(--accent-primary-bright);}
.fp-callout--caution .fp-callout__label{color:var(--accent-warn-bright);}
.fp-callout__body .fp-p:last-child{margin-bottom:0;}

/* pull quote */
.fp-pullquote{position:relative; margin:24px 0; padding:24px 26px 24px 56px; border:1px solid var(--border-accent); border-radius:var(--radius-lg);
  background:radial-gradient(120% 100% at 0% 0%, rgba(157,140,245,.12), transparent 60%), var(--bg-secondary);}
.fp-pullquote__mark{position:absolute; left:18px; top:6px; font-family:var(--font-heading); font-size:54px; color:var(--accent-primary-dim); line-height:1;}
.fp-pullquote p{margin:0; font-family:var(--font-heading); font-size:19px; font-weight:500; line-height:1.5; color:var(--text-primary);}

/* disclaimer */
.fp-disc{margin:0 0 22px; padding:16px 18px; border:1px solid var(--accent-warn); border-radius:var(--radius-md); background:rgba(201,168,76,.06);}
.fp-disc__head{display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;}
.fp-disc__tag{display:flex; align-items:center; gap:7px; font-family:var(--font-mono); font-size:10.5px; letter-spacing:.14em; color:var(--accent-warn-bright);}
.fp-disc__x{background:none; border:none; color:var(--text-muted); font-size:16px; display:flex; padding:2px;}
.fp-disc__x:hover{color:var(--text-primary);}
.fp-disc p{margin:0; font-size:13.5px; color:var(--text-secondary); line-height:1.6;}
.fp-disc--collapsed{display:flex; align-items:center; gap:8px; width:100%; justify-content:center; color:var(--accent-warn-bright);
  font-family:var(--font-mono); font-size:11px; letter-spacing:.08em; padding:9px;}

/* upsell */
.fp-upsell{margin:22px 0; padding:20px; border:1px solid var(--border-accent); border-radius:var(--radius-lg); background:var(--bg-tertiary);
  box-shadow:0 0 30px -16px var(--accent-glow);}
.fp-upsell__tag{font-family:var(--font-mono); font-size:9.5px; letter-spacing:.16em; color:var(--accent-primary-bright); border:1px solid var(--border-accent); padding:3px 8px; border-radius:20px;}
.fp-upsell__name{font-family:var(--font-heading); font-size:20px; font-weight:700; margin:12px 0 6px;}
.fp-upsell__desc{font-size:14px; color:var(--text-secondary); margin:0 0 14px;}
.fp-upsell__cta{display:inline-flex; align-items:center; gap:8px; font-family:var(--font-heading); font-weight:600; font-size:13px; letter-spacing:.08em;
  color:#0a0a0c; background:linear-gradient(135deg,var(--accent-primary),var(--accent-primary-dim)); padding:9px 16px; border-radius:8px; box-shadow:0 0 16px var(--accent-glow);}
.fp-upsell-pair{display:grid; grid-template-columns:1fr 1fr; gap:16px;}
.fp-upsell-pair .fp-upsell{margin:0;}

/* timeline split */
.fp-tl{display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:22px 0;}
.fp-tl__col{padding:18px; border-radius:var(--radius-lg); border:1px solid var(--border-subtle); background:var(--bg-secondary);}
.fp-tl__col--slow{border-color:var(--border-accent); box-shadow:0 0 26px -16px var(--accent-glow);}
.fp-tl__head{font-family:var(--font-heading); font-weight:700; font-size:13px; letter-spacing:.12em; display:flex; flex-direction:column; gap:2px; margin-bottom:14px; color:var(--accent-primary-bright);}
.fp-tl__col--fast .fp-tl__head{color:var(--text-secondary);}
.fp-tl__head span{font-family:var(--font-mono); font-size:9.5px; letter-spacing:.1em; color:var(--text-muted); font-weight:400;}
.fp-tl__row{display:flex; gap:11px; align-items:flex-start; margin-bottom:11px;}
.fp-tl__ic{font-size:17px; color:var(--accent-primary); margin-top:1px; display:flex;}
.fp-tl__col--fast .fp-tl__ic{color:var(--text-secondary);}
.fp-tl__row b{display:block; font-size:14px; font-weight:600;}
.fp-tl__row i{display:block; font-size:12px; font-style:normal; color:var(--text-muted);}
.fp-tl__foot{font-size:11.5px; color:var(--text-muted); margin:12px 0 0; font-style:italic; line-height:1.45;}

/* body fat table */
.fp-bft{margin:8px 0 18px;}
.fp-bft__toggle{display:inline-flex; border:1px solid var(--border-visible); border-radius:8px; overflow:hidden; margin-bottom:14px;}
.fp-bft__toggle button{padding:8px 22px; background:var(--bg-tertiary); border:none; color:var(--text-secondary); font-family:var(--font-mono); font-size:11px; letter-spacing:.12em; transition:var(--transition);}
.fp-bft__toggle button.is-on{background:linear-gradient(135deg,var(--accent-primary),var(--accent-primary-dim)); color:#0a0a0c; font-weight:600;}
.fp-bft__rows{display:flex; flex-direction:column; gap:8px;}
.fp-bft__row{border:1px solid var(--border-subtle); border-radius:var(--radius-md); background:var(--bg-secondary); overflow:hidden;}
.fp-bft__row.is-target{border-color:var(--accent-primary); box-shadow:0 0 18px -4px var(--accent-glow); background:linear-gradient(180deg,rgba(157,140,245,.08),transparent);}
.fp-bft__head{width:100%; display:flex; align-items:center; gap:12px; padding:13px 16px; background:none; border:none; color:var(--text-primary);}
.fp-bft__range{font-family:var(--font-mono); font-size:15px; color:var(--accent-primary-bright); min-width:90px; text-align:left;}
.fp-bft__badge{font-family:var(--font-mono); font-size:9px; letter-spacing:.12em; color:#0a0a0c; background:var(--accent-primary); padding:2px 8px; border-radius:12px;}
.fp-bft__tg{margin-left:auto; font-size:15px; color:var(--text-muted); display:flex;}
.fp-bft__note{margin:0; padding:0 16px 14px; font-size:13.5px; color:var(--text-secondary); line-height:1.55;}
.fp-bft__cap{font-size:12px; color:var(--text-muted); margin:12px 0 0; line-height:1.5; font-style:italic;}

/* posture compare */
.fp-pc{display:grid; grid-template-columns:1fr 1fr; gap:14px; margin:18px 0;}
.fp-pc__side{padding:16px; border-radius:var(--radius-lg); border:1px solid var(--border-subtle); background:var(--bg-secondary);}
.fp-pc__side--avoid{opacity:.82;}
.fp-pc__side--ok{border-color:var(--accent-primary); box-shadow:0 0 26px -14px var(--accent-glow); background:linear-gradient(180deg,rgba(157,140,245,.08),transparent);}
.fp-pc__top{display:flex; align-items:center; gap:8px; font-family:var(--font-mono); font-size:11px; letter-spacing:.14em; margin-bottom:10px; color:var(--text-muted);}
.fp-pc__side--ok .fp-pc__top{color:var(--accent-primary-bright);}
.fp-pc__mark{display:grid; place-items:center; width:22px; height:22px; border-radius:50%; font-size:13px;}
.fp-pc__side--avoid .fp-pc__mark{background:rgba(248,113,113,.12); color:var(--accent-red-text);}
.fp-pc__side--ok .fp-pc__mark{background:rgba(157,140,245,.16); color:var(--accent-primary-bright);}
.fp-pc__side h5{font-family:var(--font-heading); font-size:15px; margin:0 0 9px; font-weight:600;}
.fp-pc__side ul{list-style:none; margin:0; padding:0;}
.fp-pc__side li{font-size:13px; color:var(--text-secondary); margin-bottom:7px; padding-left:14px; position:relative; line-height:1.45;}
.fp-pc__side li::before{content:"–"; position:absolute; left:0; color:var(--accent-primary-dim);}

/* stepper */
.fp-stepper{list-style:none; margin:18px 0; padding:0; position:relative;}
.fp-stepper::before{content:""; position:absolute; left:13px; top:6px; bottom:6px; width:2px; background:linear-gradient(180deg,var(--accent-primary),var(--accent-primary-dim));}
.fp-stepper__item{display:flex; gap:14px; margin-bottom:16px; position:relative;}
.fp-stepper__dot{flex-shrink:0; width:28px; height:28px; border-radius:50%; display:grid; place-items:center; font-family:var(--font-mono); font-size:13px; font-weight:700;
  background:var(--bg-tertiary); border:1px solid var(--accent-primary); color:var(--accent-primary-bright); box-shadow:0 0 12px var(--accent-glow); z-index:1;}
.fp-stepper__item b{display:block; font-family:var(--font-heading); font-size:14px; font-weight:600; margin:3px 0 4px; letter-spacing:.04em;}
.fp-stepper__item p{margin:0; font-size:13.5px; color:var(--text-secondary); line-height:1.5;}

/* jump link */
.fp-jump{display:inline-flex; align-items:center; gap:8px; margin:6px 0 14px; padding:8px 14px; background:var(--bg-tertiary);
  border:1px solid var(--border-accent); border-radius:8px; color:var(--accent-primary-bright); font-size:12.5px; transition:var(--transition);}
.fp-jump:hover{box-shadow:0 0 14px var(--accent-glow); background:var(--bg-hover);}

/* hydration */
.fp-hydro{display:grid; grid-template-columns:1fr 120px; gap:20px; margin:18px 0; padding:20px; border:1px solid var(--border-accent); border-radius:var(--radius-lg);
  background:radial-gradient(100% 100% at 0% 0%, rgba(157,140,245,.08), transparent 60%), var(--bg-secondary);}
.fp-hydro__inrow label{font-family:var(--font-mono); font-size:10px; letter-spacing:.12em; color:var(--text-muted); display:block; margin-bottom:7px;}
.fp-hydro__input{display:flex; gap:8px;}
.fp-hydro__input input{flex:1; min-width:0; background:var(--bg-tertiary); border:1px solid var(--border-visible); border-radius:8px; padding:10px 12px;
  color:var(--text-primary); font-family:var(--font-mono); font-size:16px;}
.fp-hydro__input input:focus{outline:none; border-color:var(--accent-primary); box-shadow:0 0 0 3px rgba(157,140,245,.15);}
.fp-hydro__unit{display:inline-flex; border:1px solid var(--border-visible); border-radius:8px; overflow:hidden;}
.fp-hydro__unit button{padding:0 12px; background:var(--bg-tertiary); border:none; color:var(--text-secondary); font-family:var(--font-mono); font-size:12px;}
.fp-hydro__unit button.is-on{background:var(--accent-primary); color:#0a0a0c; font-weight:600;}
.fp-hydro__out{margin:18px 0; display:flex; flex-direction:column;}
.fp-hydro__big{font-family:var(--font-heading); font-size:46px; font-weight:700; color:var(--accent-primary-bright); line-height:1; text-shadow:0 0 22px var(--accent-glow);}
.fp-hydro__unitlbl{font-family:var(--font-mono); font-size:12px; color:var(--text-secondary); letter-spacing:.1em; margin-top:4px;}
.fp-hydro__sub{font-size:12px; color:var(--text-muted); margin-top:6px;}
.fp-hydro__scale{margin-top:6px;}
.fp-hydro__scalelbl{font-family:var(--font-mono); font-size:9.5px; letter-spacing:.12em; color:var(--text-muted); display:block; margin-bottom:8px;}
.fp-hydro__swatches{display:flex; gap:6px;}
.fp-hydro__sw{flex:1; height:30px; border-radius:5px; border:1px solid var(--border-subtle); transition:var(--transition);}
.fp-hydro__sw.is-on{border-color:#fff; box-shadow:0 0 0 2px var(--accent-primary), 0 0 12px var(--accent-glow); transform:translateY(-2px);}
.fp-hydro__fb{font-size:12.5px; margin:10px 0 0; padding:7px 11px; border-radius:6px; background:var(--bg-tertiary);}
.fp-hydro__fb--good{color:var(--accent-green-text);} .fp-hydro__fb--warn{color:var(--accent-warn-bright);} .fp-hydro__fb--bad{color:var(--accent-red-text);}
.fp-hydro__cyl{display:flex; flex-direction:column; align-items:center; justify-content:flex-end;}
.fp-hydro__tube{position:relative; width:54px; height:200px; border:1.5px solid var(--border-accent); border-radius:12px; background:var(--bg-primary); overflow:hidden;}
.fp-hydro__fill{position:absolute; left:0; right:0; bottom:0; border-radius:0 0 10px 10px; box-shadow:0 0 20px var(--accent-glow); transition:height .45s ease, background .45s ease;}
.fp-hydro__mark{position:absolute; left:0; right:0; border-top:1px dashed var(--accent-primary-bright); z-index:2; pointer-events:none;}
.fp-hydro__mark span{position:absolute; right:3px; top:-13px; font-family:var(--font-mono); font-size:8px; letter-spacing:.06em; color:var(--accent-primary-bright); background:var(--bg-primary); padding:0 4px;}
.fp-hydro__status{font-family:var(--font-mono); font-size:10px; letter-spacing:.12em; color:var(--text-secondary); margin-top:9px;}

/* skincare grid */
.fp-skin{margin:8px 0 18px;}
.fp-skin__grid{display:grid; grid-template-columns:repeat(3,1fr); gap:12px;}
.fp-skin__cell{display:flex; flex-direction:column; align-items:center; gap:9px; padding:18px 10px; border:1px solid var(--border-subtle); border-radius:var(--radius-md);
  background:var(--bg-secondary); color:var(--text-secondary); transition:var(--transition);}
.fp-skin__cell:hover,.fp-skin__cell.is-open{border-color:var(--accent-primary); box-shadow:0 0 18px -6px var(--accent-glow); color:var(--text-primary); background:linear-gradient(180deg,rgba(157,140,245,.06),transparent);}
.fp-skin__ic{font-size:26px; color:var(--accent-primary-bright); display:flex;}
.fp-skin__lbl{font-family:var(--font-heading); font-size:12.5px; font-weight:600; letter-spacing:.04em;}
.fp-skin__note{margin:14px 0 0; padding:14px 16px; border:1px solid var(--border-accent); border-radius:var(--radius-md); background:var(--bg-tertiary); font-size:13.5px; color:var(--text-secondary); line-height:1.55;}
.fp-skin__note b{color:var(--accent-primary-bright);}

/* habit tracker */
.fp-track{margin:8px 0 18px; padding:18px; border:1px solid var(--border-accent); border-radius:var(--radius-lg); background:var(--bg-secondary);}
.fp-track--loading{color:var(--text-muted); font-family:var(--font-mono); font-size:12px; text-align:center; padding:40px;}
.fp-track__top{display:flex; gap:22px; align-items:center; margin-bottom:18px; flex-wrap:wrap;}
.fp-dial{position:relative; width:80px; height:80px; flex-shrink:0;}
.fp-dial svg{width:80px; height:80px;}
.fp-dial__bg{fill:none; stroke:var(--bg-tertiary); stroke-width:7;}
.fp-dial__fg{fill:none; stroke:var(--accent-primary); stroke-width:7; stroke-linecap:round; filter:drop-shadow(0 0 4px var(--accent-glow)); transition:stroke-dashoffset .5s ease;}
.fp-dial__center{position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center;}
.fp-dial__center b{font-family:var(--font-heading); font-size:22px; color:var(--accent-primary-bright); line-height:1;}
.fp-dial__center i{font-family:var(--font-mono); font-size:8px; font-style:normal; letter-spacing:.1em; color:var(--text-muted);}
.fp-trend{flex:1; min-width:160px;}
.fp-trend__lbl{font-family:var(--font-mono); font-size:9px; letter-spacing:.12em; color:var(--text-muted); display:block; margin-bottom:6px;}
.fp-trend svg{width:100%; height:56px;}
.fp-trend__line{fill:none; stroke:var(--accent-primary); stroke-width:2; filter:drop-shadow(0 0 3px var(--accent-glow)); vector-effect:non-scaling-stroke;}
.fp-trend__dot{fill:var(--accent-primary-bright);}
.fp-track__gridwrap{overflow-x:auto;}
.fp-track__grid{border-collapse:separate; border-spacing:5px; width:100%; min-width:430px;}
.fp-track__grid th{font-family:var(--font-mono); font-size:10px; color:var(--text-muted); font-weight:400; padding-bottom:2px;}
.fp-track__rowhead{text-align:left; font-family:var(--font-body); font-size:11.5px; color:var(--text-secondary); white-space:nowrap; padding-right:8px; display:flex; align-items:center; gap:7px;}
.fp-track__ic{font-size:15px; color:var(--accent-primary); display:flex;}
.fp-track__cell{width:34px; height:34px; border-radius:7px; border:1px solid var(--border-visible); background:var(--bg-tertiary); display:grid; place-items:center; color:transparent; transition:var(--transition);}
.fp-track__cell:hover{border-color:var(--accent-primary);}
.fp-track__cell.is-on{background:linear-gradient(135deg,rgba(157,140,245,.3),rgba(157,140,245,.1)); border-color:var(--accent-primary); color:var(--accent-primary-bright); box-shadow:0 0 10px var(--accent-glow);}
.fp-track__foot{display:flex; align-items:center; justify-content:space-between; margin-top:14px; gap:10px;}
.fp-track__reset{display:inline-flex; align-items:center; gap:7px; background:var(--bg-tertiary); border:1px solid var(--border-visible); border-radius:7px; color:var(--text-secondary); font-family:var(--font-mono); font-size:10.5px; letter-spacing:.08em; padding:7px 12px;}
.fp-track__reset:hover{border-color:var(--accent-primary); color:var(--text-primary);}
.fp-track__save{font-family:var(--font-mono); font-size:10px; color:var(--text-muted);}

/* FAQ */
.fp-faq{margin-top:6px;}
.fp-faq__search{display:flex; align-items:center; gap:10px; padding:11px 14px; border:1px solid var(--border-visible); border-radius:var(--radius-md); background:var(--bg-secondary); margin-bottom:14px; color:var(--text-muted);}
.fp-faq__search input{flex:1; min-width:0; background:none; border:none; color:var(--text-primary); font-size:14px; outline:none;}
.fp-faq__search button{background:none; border:none; color:var(--text-muted); display:flex; font-size:15px;}
.fp-faq__tabs{display:flex; flex-wrap:wrap; gap:7px; margin-bottom:16px;}
.fp-faq__tab{padding:6px 13px; border:1px solid var(--border-subtle); border-radius:20px; background:var(--bg-secondary); color:var(--text-secondary); font-family:var(--font-mono); font-size:10px; letter-spacing:.06em; transition:var(--transition);}
.fp-faq__tab:hover{border-color:var(--border-accent);}
.fp-faq__tab.is-on{background:var(--accent-primary); color:#0a0a0c; border-color:transparent; font-weight:600;}
.fp-faq__list{display:flex; flex-direction:column; gap:8px;}
.fp-faq__item{border:1px solid var(--border-subtle); border-radius:var(--radius-md); background:var(--bg-secondary); overflow:hidden;}
.fp-faq__item.is-open{border-color:var(--border-accent);}
.fp-faq__q{width:100%; display:flex; align-items:center; justify-content:space-between; gap:12px; padding:14px 16px; background:none; border:none; color:var(--text-primary); font-size:14.5px; font-weight:500; text-align:left;}
.fp-faq__q svg{flex-shrink:0; color:var(--accent-primary); font-size:16px;}
.fp-faq__a{padding:0 16px 15px;}
.fp-faq__cat{font-family:var(--font-mono); font-size:9px; letter-spacing:.12em; color:var(--accent-primary-bright); border:1px solid var(--border-accent); padding:2px 7px; border-radius:12px;}
.fp-faq__a p{margin:9px 0 0; font-size:13.5px; color:var(--text-secondary); line-height:1.6;}
.fp-faq__empty{font-size:13px; color:var(--text-muted); text-align:center; padding:24px;}

/* completion badge */
.fp-badge{margin:30px 0 10px; padding:34px 24px; border-radius:var(--radius-lg); text-align:center; border:1px solid var(--border-subtle); background:var(--bg-secondary);}
.fp-badge.is-on{border-color:var(--accent-primary); background:radial-gradient(120% 100% at 50% 0%, rgba(157,140,245,.16), transparent 65%), var(--bg-secondary); box-shadow:0 0 50px -16px var(--accent-glow); animation:fpBadge .5s ease;}
@keyframes fpBadge{from{opacity:0; transform:scale(.96);} to{opacity:1; transform:scale(1);}}
.fp-badge__seal{width:60px; height:60px; margin:0 auto 16px; border-radius:50%; display:grid; place-items:center; font-size:28px;
  background:linear-gradient(135deg,var(--accent-primary),var(--accent-primary-dim)); color:#0a0a0c; box-shadow:0 0 26px var(--accent-glow);}
.fp-badge__seal--lock{background:var(--bg-tertiary); color:var(--text-muted); box-shadow:none; border:1px solid var(--border-visible);}
.fp-badge__title{font-family:var(--font-heading); font-size:19px; font-weight:700; letter-spacing:.08em;}
.fp-badge.is-on .fp-badge__title{color:var(--accent-primary-bright); text-shadow:0 0 18px var(--accent-glow);}
.fp-badge__sub{font-family:var(--font-mono); font-size:11px; color:var(--text-muted); margin-top:7px; letter-spacing:.06em;}
.fp-badge__awarded{font-family:var(--font-mono); font-size:10px; letter-spacing:.22em; color:var(--text-muted); margin-top:16px;}
.fp-badge__name{font-family:var(--font-heading); font-size:30px; font-weight:700; letter-spacing:.01em; margin-top:6px; color:var(--text-primary);}
.fp-badge.is-on .fp-badge__name{color:var(--accent-primary-bright); text-shadow:0 0 22px var(--accent-glow);}
.fp-badge__line{width:120px; height:1px; margin:14px auto 0; background:linear-gradient(90deg,transparent,var(--accent-primary),transparent);}

/* mark read + footer */
.fp-section__foot{margin-top:22px;}
.fp-markread{background:none; border:1px solid var(--border-visible); color:var(--text-muted); padding:9px 18px; border-radius:8px; font-family:var(--font-mono); font-size:11px; letter-spacing:.1em; display:inline-flex; align-items:center; gap:8px; transition:var(--transition);}
.fp-markread:hover{border-color:var(--border-accent); color:var(--text-secondary);}
.fp-markread.is-done{border-color:var(--accent-green-text); color:var(--accent-green-text); background:rgba(74,222,128,.06);}
.fp-footer{display:flex; align-items:center; gap:10px; justify-content:center; padding:30px 0 0; color:var(--text-muted); font-family:var(--font-mono); font-size:10.5px; letter-spacing:.1em;}

.fp-scrim{display:none;}

/* responsive */
@media (max-width:1000px){ .fp-hydro{grid-template-columns:1fr;} .fp-hydro__cyl{margin-top:6px;} .fp-hydro__tube{height:150px;} }
@media (max-width:860px){
  .fp-burger{display:flex;}
  .fp-sidebar{transform:translateX(-100%); transition:transform .25s ease; box-shadow:0 0 40px rgba(0,0,0,.6);}
  .fp-sidebar.is-open{transform:translateX(0);}
  .fp-content{margin-left:0;}
  .fp-content__inner{padding:24px 20px 100px;}
  .fp-scrim{display:block; position:fixed; inset:var(--header-h) 0 0 0; background:rgba(0,0,0,.5); z-index:25; touch-action:none; overscroll-behavior:contain;}
  .fp-tl,.fp-pc,.fp-upsell-pair,.fp-skin__grid{grid-template-columns:1fr;}
  .fp-skin__grid{grid-template-columns:repeat(2,1fr);}
  .fp-sechead__title{font-size:24px;}
  .fp-header__title{display:none;}
}
@media (prefers-reduced-motion:reduce){ .fp-app *{animation:none !important; transition:none !important; scroll-behavior:auto !important;} }


/* ===== Diet-specific components (dp-) ===== */

/* EnergyLedgerVisual (S01) — interactive balance scale */
.dp-ledger{margin:26px 0; padding:26px 22px 20px; border:1px solid var(--border-accent); border-radius:var(--radius-lg); background:radial-gradient(120% 90% at 50% 0%, rgba(157,140,245,.12), transparent 70%), var(--bg-secondary);}
.dp-ledger__lbl{font-family:var(--font-mono); font-size:10px; letter-spacing:.16em; color:var(--text-muted); text-align:center; margin-bottom:6px;}
.dp-ledger__beam{position:relative; height:128px; margin:8px auto 4px; max-width:440px;}
.dp-ledger__fulcrum{position:absolute; left:50%; bottom:0; width:2px; height:64px; transform:translateX(-50%); background:linear-gradient(180deg,var(--accent-primary),var(--accent-primary-dim));}
.dp-ledger__pivot{position:absolute; left:50%; top:56px; width:14px; height:14px; transform:translate(-50%,-50%); border-radius:50%; border:1px solid var(--accent-primary-bright); background:var(--bg-primary); box-shadow:0 0 16px -2px var(--accent-glow); z-index:3;}
.dp-ledger__bar{position:absolute; left:50%; top:62px; width:300px; height:3px; transform:translateX(-50%) rotate(var(--tilt,0deg)); transform-origin:50% 50%; background:linear-gradient(90deg,var(--accent-primary),var(--accent-primary-bright),var(--accent-primary)); border-radius:3px; transition:transform 420ms cubic-bezier(.34,1.3,.5,1); z-index:2;}
.dp-ledger__pan{position:absolute; top:0; width:84px; text-align:center; transition:transform 420ms cubic-bezier(.34,1.3,.5,1);}
.dp-ledger__pan--in{left:8px; transform:translateY(var(--inY,0px));}
.dp-ledger__pan--out{right:8px; transform:translateY(var(--outY,0px));}
.dp-ledger__chain{height:30px; width:1px; margin:0 auto; background:linear-gradient(180deg,transparent,var(--border-accent));}
.dp-ledger__dish{height:38px; border:1px solid var(--border-accent); border-top:none; border-radius:0 0 40px 40px / 0 0 28px 28px; display:flex; align-items:center; justify-content:center; gap:6px; background:linear-gradient(180deg,rgba(157,140,245,.10),transparent); box-shadow:0 0 24px -10px var(--accent-glow);}
.dp-ledger__ic{font-size:20px; color:var(--accent-primary-bright); display:flex;}
.dp-ledger__plbl{font-family:var(--font-mono); font-size:8.5px; letter-spacing:.1em; color:var(--text-muted); margin-top:7px;}
.dp-ledger__ctrls{display:flex; gap:8px; justify-content:center; margin:14px 0 12px; flex-wrap:wrap;}
.dp-ledger__btn{font-family:var(--font-mono); font-size:10.5px; letter-spacing:.08em; padding:8px 14px; border:1px solid var(--border-visible); border-radius:30px; background:var(--bg-tertiary); color:var(--text-secondary); cursor:pointer; transition:all var(--transition);}
.dp-ledger__btn:hover{border-color:var(--accent-primary); color:var(--text-primary);}
.dp-ledger__btn.is-active{border-color:var(--accent-primary); background:linear-gradient(180deg,rgba(157,140,245,.2),rgba(157,140,245,.04)); color:var(--accent-primary-bright); box-shadow:0 0 20px -6px var(--accent-glow);}
.dp-ledger__cap{text-align:center; font-size:14px; color:var(--text-secondary); line-height:1.55; margin:4px auto 0; max-width:480px; min-height:42px;}
.dp-ledger__cap b{font-family:var(--font-heading); font-weight:600;}
.dp-ledger__cap b.up{color:var(--accent-red-text);} .dp-ledger__cap b.down{color:var(--accent-green-text);} .dp-ledger__cap b.hold{color:var(--accent-primary-bright);}

/* TwoSystemsComparison (S01) — two click-to-expand brackets */
.dp-two{display:grid; grid-template-columns:1fr 1fr; gap:14px; margin:24px 0;}
@media (max-width:620px){ .dp-two{grid-template-columns:1fr;} }
.dp-two__card{position:relative; border:1px solid var(--border-visible); border-radius:var(--radius-lg); background:var(--bg-secondary); padding:20px 18px; cursor:pointer; transition:all var(--transition); overflow:hidden;}
.dp-two__card:hover{border-color:var(--accent-primary);}
.dp-two__card.is-open{border-color:var(--accent-primary); box-shadow:0 0 30px -10px var(--accent-glow); background:radial-gradient(120% 80% at 50% 0%,rgba(157,140,245,.10),transparent 70%),var(--bg-secondary);}
.dp-two__bracket{position:absolute; top:14px; bottom:14px; width:10px; border:1px solid var(--border-accent); opacity:.5;}
.dp-two__bracket--l{left:10px; border-right:none; border-radius:6px 0 0 6px;}
.dp-two__bracket--r{right:10px; border-left:none; border-radius:0 6px 6px 0;}
.dp-two__ic{font-size:24px; color:var(--accent-primary-bright); display:flex; justify-content:center; margin-bottom:10px;}
.dp-two__name{font-family:var(--font-heading); font-size:15px; font-weight:600; color:var(--text-primary); text-align:center; letter-spacing:.02em;}
.dp-two__driver{font-family:var(--font-mono); font-size:9.5px; letter-spacing:.1em; color:var(--accent-primary); text-align:center; margin-top:7px; text-transform:uppercase;}
.dp-two__more{font-family:var(--font-mono); font-size:9px; letter-spacing:.12em; color:var(--text-muted); text-align:center; margin-top:12px;}
.dp-two__body{max-height:0; overflow:hidden; transition:max-height 320ms ease; }
.dp-two__card.is-open .dp-two__body{max-height:340px;}
.dp-two__bodyinner{padding-top:14px; margin-top:14px; border-top:1px solid var(--border-subtle); font-size:13.5px; line-height:1.6; color:var(--text-secondary);}

/* Generic calculator shell (Maintenance / Protein) */
.dp-calc{margin:24px 0; padding:22px; border:1px solid var(--border-accent); border-radius:var(--radius-lg); background:radial-gradient(120% 90% at 50% 0%, rgba(157,140,245,.10), transparent 70%), var(--bg-secondary);}
.dp-calc__lbl{font-family:var(--font-mono); font-size:10px; letter-spacing:.16em; color:var(--text-muted); margin-bottom:16px;}
.dp-calc__grid{display:flex; flex-wrap:wrap; gap:14px; align-items:flex-end;}
.dp-field{display:flex; flex-direction:column; gap:7px; flex:1; min-width:120px;}
.dp-field__lbl{font-family:var(--font-mono); font-size:9.5px; letter-spacing:.1em; color:var(--text-secondary); text-transform:uppercase;}
.dp-field__in{background:var(--bg-primary); border:1px solid var(--border-visible); border-radius:var(--radius-sm); color:var(--text-primary); font-family:var(--font-mono); font-size:15px; padding:10px 12px; width:100%; transition:border var(--transition);}
.dp-field__in:focus{outline:none; border-color:var(--accent-primary);}
.dp-seg{display:flex; gap:0; border:1px solid var(--border-visible); border-radius:var(--radius-sm); overflow:hidden;}
.dp-seg__b{flex:1; font-family:var(--font-mono); font-size:11px; padding:10px 8px; background:var(--bg-primary); color:var(--text-secondary); border:none; cursor:pointer; transition:all var(--transition); white-space:nowrap;}
.dp-seg__b+.dp-seg__b{border-left:1px solid var(--border-visible);}
.dp-seg__b.is-active{background:linear-gradient(180deg,rgba(157,140,245,.22),rgba(157,140,245,.05)); color:var(--accent-primary-bright);}
.dp-calc__out{margin-top:18px; padding:16px 18px; border:1px solid var(--border-accent); border-radius:var(--radius-md); background:var(--bg-primary); display:flex; align-items:baseline; justify-content:center; gap:12px; flex-wrap:wrap;}
.dp-calc__big{font-family:var(--font-mono); font-size:32px; font-weight:700; color:var(--accent-primary-bright); text-shadow:0 0 24px var(--accent-glow); line-height:1;}
.dp-calc__unit{font-family:var(--font-mono); font-size:12px; letter-spacing:.12em; color:var(--text-secondary);}
.dp-calc__note{margin-top:12px; font-size:12.5px; color:var(--text-muted); text-align:center; line-height:1.55;}
.dp-calc__range{font-family:var(--font-mono); font-size:13px; color:var(--accent-primary); margin-left:4px;}

/* WeeklyDiscoveryTracker (S02) — 7 day weight + outcome */
.dp-disc{margin:24px 0; padding:22px; border:1px solid var(--border-accent); border-radius:var(--radius-lg); background:var(--bg-secondary);}
.dp-disc__lbl{font-family:var(--font-mono); font-size:10px; letter-spacing:.16em; color:var(--text-muted); margin-bottom:14px;}
.dp-disc__days{display:grid; grid-template-columns:repeat(7,1fr); gap:7px;}
@media (max-width:560px){ .dp-disc__days{grid-template-columns:repeat(4,1fr);} }
.dp-disc__day{display:flex; flex-direction:column; gap:5px;}
.dp-disc__dn{font-family:var(--font-mono); font-size:8.5px; letter-spacing:.06em; color:var(--text-muted); text-align:center;}
.dp-disc__in{background:var(--bg-primary); border:1px solid var(--border-visible); border-radius:var(--radius-sm); color:var(--text-primary); font-family:var(--font-mono); font-size:12.5px; padding:8px 4px; width:100%; text-align:center; transition:border var(--transition);}
.dp-disc__in:focus{outline:none; border-color:var(--accent-primary);}
.dp-disc__row{display:flex; gap:10px; align-items:center; margin-top:14px; flex-wrap:wrap;}
.dp-disc__save{font-family:var(--font-mono); font-size:10.5px; letter-spacing:.08em; padding:9px 16px; border:1px solid var(--accent-primary); border-radius:30px; background:linear-gradient(180deg,rgba(157,140,245,.2),rgba(157,140,245,.04)); color:var(--accent-primary-bright); cursor:pointer; transition:all var(--transition);}
.dp-disc__save:hover{box-shadow:0 0 20px -6px var(--accent-glow);}
.dp-disc__reset{font-family:var(--font-mono); font-size:10px; letter-spacing:.08em; padding:9px 14px; border:1px solid var(--border-visible); border-radius:30px; background:transparent; color:var(--text-muted); cursor:pointer;}
.dp-disc__reset:hover{border-color:var(--accent-red-text); color:var(--accent-red-text);}
.dp-disc__avg{font-family:var(--font-mono); font-size:11px; color:var(--text-secondary); margin-left:auto;}
.dp-disc__avg b{color:var(--accent-primary-bright);}
.dp-disc__outcome{margin-top:16px; padding:16px 18px; border-radius:var(--radius-md); border:1px solid var(--border-accent); background:var(--bg-primary); display:flex; gap:13px; align-items:flex-start;}
.dp-disc__oic{font-size:22px; display:flex; flex-shrink:0; margin-top:1px;}
.dp-disc__otitle{font-family:var(--font-heading); font-size:14px; font-weight:600; margin:0 0 4px;}
.dp-disc__obody{font-size:13px; color:var(--text-secondary); line-height:1.55; margin:0;}
.dp-disc--up .dp-disc__oic{color:var(--accent-red-text);} .dp-disc--up .dp-disc__otitle{color:var(--accent-red-text);}
.dp-disc--hold .dp-disc__oic{color:var(--accent-primary-bright);} .dp-disc--hold .dp-disc__otitle{color:var(--accent-primary-bright);}
.dp-disc--down .dp-disc__oic{color:var(--accent-green-text);} .dp-disc--down .dp-disc__otitle{color:var(--accent-green-text);}
.dp-disc__hint{font-size:12px; color:var(--text-muted); text-align:center; margin:14px 0 0; line-height:1.5;}

/* BodyFatTargetSelector (S02) — two vessels + band picker */
.dp-bfs{margin:24px 0; padding:22px; border:1px solid var(--border-accent); border-radius:var(--radius-lg); background:var(--bg-secondary);}
.dp-bfs__lbl{font-family:var(--font-mono); font-size:10px; letter-spacing:.16em; color:var(--text-muted); margin-bottom:8px;}
.dp-bfs__toggle{display:flex; gap:8px; margin-bottom:18px;}
.dp-bfs__tg{font-family:var(--font-mono); font-size:11px; letter-spacing:.08em; padding:7px 16px; border:1px solid var(--border-visible); border-radius:30px; background:var(--bg-tertiary); color:var(--text-secondary); cursor:pointer; transition:all var(--transition);}
.dp-bfs__tg.is-active{border-color:var(--accent-primary); color:var(--accent-primary-bright); background:linear-gradient(180deg,rgba(157,140,245,.18),transparent);}
.dp-bfs__vessel{position:relative; width:108px; height:188px; margin:0 auto; border:1px solid var(--border-accent); border-radius:10px; background:var(--bg-primary); overflow:hidden; box-shadow:inset 0 0 30px -16px var(--accent-glow);}
.dp-bfs__fill{position:absolute; left:0; right:0; bottom:0; background:linear-gradient(180deg,var(--accent-primary),var(--accent-primary-dim)); box-shadow:0 0 26px -4px var(--accent-glow); transition:height 520ms cubic-bezier(.4,1,.4,1);}
.dp-bfs__cap{position:absolute; left:0; right:0; height:2px; background:var(--accent-primary-bright); box-shadow:0 0 12px 1px var(--accent-glow); transition:bottom 520ms cubic-bezier(.4,1,.4,1);}
.dp-bfs__pct{position:absolute; left:50%; transform:translateX(-50%); top:10px; font-family:var(--font-mono); font-size:20px; font-weight:700; color:var(--accent-primary-bright); text-shadow:0 0 16px var(--accent-glow);}
.dp-bfs__rows{display:flex; flex-direction:column; gap:7px; margin-top:18px;}
.dp-bfs__band{display:flex; align-items:center; gap:12px; padding:11px 14px; border:1px solid var(--border-subtle); border-radius:var(--radius-md); background:var(--bg-tertiary); cursor:pointer; transition:all var(--transition); text-align:left; width:100%;}
.dp-bfs__band:hover{border-color:var(--border-accent);}
.dp-bfs__band.is-active{border-color:var(--accent-primary); background:linear-gradient(90deg,rgba(157,140,245,.14),transparent); box-shadow:0 0 22px -10px var(--accent-glow);}
.dp-bfs__brange{font-family:var(--font-mono); font-size:13px; color:var(--accent-primary-bright); min-width:74px; font-weight:600;}
.dp-bfs__bname{font-family:var(--font-heading); font-size:13px; color:var(--text-primary); font-weight:600;}
.dp-bfs__bdesc{font-size:12px; color:var(--text-muted); margin-top:2px; line-height:1.4;}
.dp-bfs__feed{margin-top:16px; padding:12px 16px; border-radius:var(--radius-md); border:1px dashed var(--border-accent); background:var(--bg-primary); font-size:12.5px; color:var(--text-secondary); text-align:center; line-height:1.5;}
.dp-bfs__feed b{color:var(--accent-primary-bright); font-family:var(--font-mono);}

/* MacroBreakdownChart (S03) — three horizontal bars */
.dp-macro{margin:24px 0; padding:22px; border:1px solid var(--border-accent); border-radius:var(--radius-lg); background:radial-gradient(120% 90% at 50% 0%, rgba(157,140,245,.10), transparent 70%), var(--bg-secondary);}
.dp-macro__lbl{font-family:var(--font-mono); font-size:10px; letter-spacing:.16em; color:var(--text-muted); margin-bottom:16px;}
.dp-macro__bars{display:flex; flex-direction:column; gap:12px; margin:6px 0 4px;}
.dp-macro__bar{position:relative;}
.dp-macro__bhead{display:flex; justify-content:space-between; align-items:baseline; margin-bottom:6px;}
.dp-macro__bname{font-family:var(--font-heading); font-size:13px; font-weight:600; color:var(--text-primary); display:flex; align-items:center; gap:8px;}
.dp-macro__bic{font-size:15px; color:var(--accent-primary-bright); display:flex;}
.dp-macro__bval{font-family:var(--font-mono); font-size:12.5px; color:var(--text-secondary);}
.dp-macro__bval b{color:var(--accent-primary-bright); font-size:14px;}
.dp-macro__track{height:26px; border-radius:6px; background:var(--bg-primary); border:1px solid var(--border-subtle); overflow:hidden;}
.dp-macro__fill{height:100%; border-radius:5px; display:flex; align-items:center; justify-content:flex-end; padding-right:9px; transition:width 480ms cubic-bezier(.4,1,.4,1);}
.dp-macro__fill--p{background:linear-gradient(90deg,var(--accent-primary-dim),var(--accent-primary-bright));}
.dp-macro__fill--f{background:linear-gradient(90deg,var(--accent-primary-dim),var(--accent-primary));}
.dp-macro__fill--c{background:linear-gradient(90deg,#3a3550,#6e5fc4);}
.dp-macro__pct{font-family:var(--font-mono); font-size:10px; color:#fff; opacity:.92;}
.dp-macro__foot{display:flex; justify-content:space-between; margin-top:16px; padding-top:14px; border-top:1px solid var(--border-subtle); font-family:var(--font-mono); font-size:11px; color:var(--text-muted);}
.dp-macro__foot b{color:var(--accent-primary-bright);}
.dp-macro__ex{margin-top:14px; font-size:12.5px; color:var(--text-muted); line-height:1.55; text-align:center;}

/* PreWorkoutTimingCard (S03) — toggle windows */
.dp-pwt{margin:24px 0; border:1px solid var(--border-accent); border-radius:var(--radius-lg); overflow:hidden; background:var(--bg-secondary);}
.dp-pwt__tabs{display:flex;}
.dp-pwt__tab{flex:1; font-family:var(--font-mono); font-size:11px; letter-spacing:.05em; padding:13px 10px; background:var(--bg-tertiary); color:var(--text-secondary); border:none; border-bottom:2px solid transparent; cursor:pointer; transition:all var(--transition);}
.dp-pwt__tab+.dp-pwt__tab{border-left:1px solid var(--border-subtle);}
.dp-pwt__tab.is-active{color:var(--accent-primary-bright); background:var(--bg-secondary); border-bottom-color:var(--accent-primary);}
.dp-pwt__body{padding:20px;}
.dp-pwt__guide{font-size:14px; color:var(--text-secondary); line-height:1.6; margin:0 0 16px;}
.dp-pwt__exlbl{font-family:var(--font-mono); font-size:9.5px; letter-spacing:.12em; color:var(--text-muted); margin-bottom:9px;}
.dp-pwt__ex{display:flex; gap:11px; align-items:center; padding:11px 14px; border:1px solid var(--border-subtle); border-radius:var(--radius-md); background:var(--bg-primary); margin-bottom:8px; font-size:13.5px; color:var(--text-primary);}
.dp-pwt__exn{font-family:var(--font-mono); font-size:11px; color:var(--accent-primary); flex-shrink:0;}

/* CaseDecisionTree (S04) — branching question */
.dp-case{margin:24px 0;}
.dp-case__q{padding:20px; border:1px solid var(--border-accent); border-radius:var(--radius-lg); background:radial-gradient(120% 90% at 50% 0%, rgba(157,140,245,.10), transparent 70%), var(--bg-secondary); text-align:center;}
.dp-case__qlbl{font-family:var(--font-mono); font-size:10px; letter-spacing:.14em; color:var(--text-muted); margin-bottom:8px;}
.dp-case__qtxt{font-family:var(--font-heading); font-size:17px; font-weight:600; color:var(--text-primary); margin:0 auto 18px; max-width:440px; line-height:1.4;}
.dp-case__choices{display:flex; gap:12px; justify-content:center; flex-wrap:wrap;}
.dp-case__choice{flex:1; min-width:170px; max-width:230px; padding:16px 14px; border:1px solid var(--border-visible); border-radius:var(--radius-md); background:var(--bg-tertiary); cursor:pointer; transition:all var(--transition);}
.dp-case__choice:hover{border-color:var(--accent-primary);}
.dp-case__choice.is-active{border-color:var(--accent-primary); background:linear-gradient(180deg,rgba(157,140,245,.16),transparent); box-shadow:0 0 26px -10px var(--accent-glow);}
.dp-case__cn{font-family:var(--font-mono); font-size:9.5px; letter-spacing:.12em; color:var(--accent-primary); margin-bottom:6px;}
.dp-case__ct{font-family:var(--font-heading); font-size:14px; font-weight:600; color:var(--text-primary);}
.dp-case__panel{margin-top:14px; padding:22px; border:1px solid var(--accent-primary-dim); border-radius:var(--radius-lg); background:var(--bg-secondary); animation:dpfade 300ms ease;}
@keyframes dpfade{from{opacity:0; transform:translateY(6px);} to{opacity:1; transform:translateY(0);}}
.dp-case__ptag{display:inline-block; font-family:var(--font-mono); font-size:9.5px; letter-spacing:.12em; color:var(--accent-primary-bright); border:1px solid var(--border-accent); border-radius:20px; padding:4px 12px; margin-bottom:14px;}
.dp-case__ph{font-family:var(--font-heading); font-size:17px; font-weight:600; color:var(--text-primary); margin:0 0 12px;}
.dp-case__stats{display:flex; gap:10px; flex-wrap:wrap; margin:16px 0;}
.dp-case__stat{flex:1; min-width:120px; padding:12px 14px; border:1px solid var(--border-subtle); border-radius:var(--radius-md); background:var(--bg-primary);}
.dp-case__sk{font-family:var(--font-mono); font-size:8.5px; letter-spacing:.1em; color:var(--text-muted); text-transform:uppercase; margin-bottom:5px;}
.dp-case__sv{font-family:var(--font-mono); font-size:16px; color:var(--accent-primary-bright); font-weight:700;}

/* DeficitTacticsList (S05) */
.dp-tac{display:flex; flex-direction:column; gap:12px; margin:22px 0;}
.dp-tac__item{border:1px solid var(--border-visible); border-radius:var(--radius-lg); background:var(--bg-secondary); padding:18px 20px; transition:border var(--transition);}
.dp-tac__item:hover{border-color:var(--accent-primary);}
.dp-tac__head{display:flex; gap:13px; align-items:center; margin-bottom:9px;}
.dp-tac__n{font-family:var(--font-mono); font-size:13px; font-weight:700; color:var(--accent-primary-bright); width:28px; height:28px; flex-shrink:0; display:flex; align-items:center; justify-content:center; border:1px solid var(--border-accent); border-radius:50%; box-shadow:0 0 18px -6px var(--accent-glow);}
.dp-tac__title{font-family:var(--font-heading); font-size:15px; font-weight:600; color:var(--text-primary);}
.dp-tac__body{font-size:13.5px; color:var(--text-secondary); line-height:1.6;}
.dp-tac__worked{margin-top:11px; padding:11px 14px; border-left:2px solid var(--accent-primary); border-radius:0 var(--radius-sm) var(--radius-sm) 0; background:var(--bg-primary); font-size:12.5px; color:var(--text-muted); line-height:1.55;}
.dp-tac__worked b{color:var(--accent-primary-bright); font-family:var(--font-mono); font-size:9.5px; letter-spacing:.1em; display:block; margin-bottom:3px; text-transform:uppercase;}

/* SupplementTierList (S06) */
.dp-supp{display:flex; flex-direction:column; gap:14px; margin:22px 0;}
.dp-supp__tier{border:1px solid var(--border-visible); border-radius:var(--radius-lg); background:var(--bg-secondary); overflow:hidden;}
.dp-supp__th{display:flex; align-items:center; gap:10px; padding:13px 18px; border-bottom:1px solid var(--border-subtle);}
.dp-supp__badge{font-family:var(--font-mono); font-size:9px; letter-spacing:.1em; padding:4px 10px; border-radius:20px; text-transform:uppercase;}
.dp-supp--worth_it .dp-supp__badge{color:var(--accent-green-text); border:1px solid rgba(74,222,128,.4); background:rgba(74,222,128,.08);}
.dp-supp--convenience .dp-supp__badge{color:var(--accent-primary-bright); border:1px solid var(--border-accent); background:rgba(157,140,245,.08);}
.dp-supp--health .dp-supp__badge{color:var(--text-secondary); border:1px solid var(--border-visible); background:var(--bg-tertiary);}
.dp-supp--skip .dp-supp__badge{color:var(--accent-warn-bright); border:1px solid rgba(201,168,76,.4); background:rgba(201,168,76,.08);}
.dp-supp__tlbl{font-family:var(--font-heading); font-size:13px; font-weight:600; color:var(--text-primary);}
.dp-supp__items{padding:6px 18px 14px;}
.dp-supp__item{padding:11px 0; border-bottom:1px solid var(--border-subtle);}
.dp-supp__item:last-child{border-bottom:none;}
.dp-supp__name{font-family:var(--font-heading); font-size:14px; font-weight:600; color:var(--accent-primary-bright); margin-bottom:4px;}
.dp-supp__detail{font-size:13px; color:var(--text-secondary); line-height:1.55;}

/* DietExampleBrowser (S07) */
.dp-ex{margin:22px 0;}
.dp-ex__filters{display:flex; flex-direction:column; gap:10px; margin-bottom:18px; padding:16px; border:1px solid var(--border-visible); border-radius:var(--radius-lg); background:var(--bg-secondary);}
.dp-ex__frow{display:flex; align-items:center; gap:10px; flex-wrap:wrap;}
.dp-ex__flbl{font-family:var(--font-mono); font-size:9px; letter-spacing:.1em; color:var(--text-muted); text-transform:uppercase; min-width:62px;}
.dp-ex__chip{font-family:var(--font-mono); font-size:10.5px; letter-spacing:.04em; padding:6px 13px; border:1px solid var(--border-visible); border-radius:30px; background:var(--bg-tertiary); color:var(--text-secondary); cursor:pointer; transition:all var(--transition);}
.dp-ex__chip:hover{border-color:var(--accent-primary);}
.dp-ex__chip.is-active{border-color:var(--accent-primary); color:var(--accent-primary-bright); background:linear-gradient(180deg,rgba(157,140,245,.2),rgba(157,140,245,.04)); box-shadow:0 0 18px -6px var(--accent-glow);}
.dp-ex__count{font-family:var(--font-mono); font-size:10.5px; color:var(--text-muted); margin-bottom:12px;}
.dp-ex__count b{color:var(--accent-primary-bright);}
.dp-ex__grid{display:grid; grid-template-columns:1fr 1fr; gap:12px;}
@media (max-width:640px){ .dp-ex__grid{grid-template-columns:1fr;} }
.dp-ex__card{border:1px solid var(--border-visible); border-radius:var(--radius-lg); background:var(--bg-secondary); padding:17px 18px; transition:border var(--transition);}
.dp-ex__card:hover{border-color:var(--accent-primary);}
.dp-ex__ctop{display:flex; align-items:center; gap:9px; margin-bottom:12px; flex-wrap:wrap;}
.dp-ex__cn{font-family:var(--font-mono); font-size:11px; font-weight:700; color:var(--accent-primary-bright); width:26px; height:26px; flex-shrink:0; display:flex; align-items:center; justify-content:center; border:1px solid var(--border-accent); border-radius:50%;}
.dp-ex__tag{font-family:var(--font-mono); font-size:8.5px; letter-spacing:.06em; padding:3px 8px; border-radius:14px; border:1px solid var(--border-subtle); color:var(--text-muted); text-transform:uppercase;}
.dp-ex__tag--case2{color:var(--accent-primary-bright); border-color:var(--border-accent);}
.dp-ex__tag--case1{color:var(--accent-green-text); border-color:rgba(74,222,128,.35);}
.dp-ex__ctx{font-size:13px; color:var(--text-secondary); line-height:1.45; margin-bottom:13px;}
.dp-ex__nums{display:flex; gap:10px; margin-bottom:13px;}
.dp-ex__num{flex:1; padding:10px 12px; border:1px solid var(--border-subtle); border-radius:var(--radius-md); background:var(--bg-primary); text-align:center;}
.dp-ex__nk{font-family:var(--font-mono); font-size:8px; letter-spacing:.1em; color:var(--text-muted); text-transform:uppercase; margin-bottom:4px;}
.dp-ex__nv{font-family:var(--font-mono); font-size:16px; font-weight:700; color:var(--accent-primary-bright);}
.dp-ex__nu{font-size:9px; color:var(--text-muted); font-family:var(--font-mono);}
.dp-ex__form{font-family:var(--font-mono); font-size:9.5px; color:var(--text-muted); text-align:center; margin-bottom:12px;}
.dp-ex__meals{font-size:12.5px; color:var(--text-secondary); line-height:1.55; padding-top:12px; border-top:1px solid var(--border-subtle);}
.dp-ex__meals b{font-family:var(--font-mono); font-size:8.5px; letter-spacing:.1em; color:var(--text-muted); text-transform:uppercase; display:block; margin-bottom:5px;}
.dp-ex__empty{text-align:center; padding:30px; color:var(--text-muted); font-size:13px;}

/* 1-1 Coaching cross-sell (S09) — distinct from the standard protocol upsell */
.dp-coach{position:relative; margin-top:14px; padding:26px 24px; border:1px solid var(--accent-primary-dim); border-radius:var(--radius-lg); background:radial-gradient(140% 120% at 50% 0%, rgba(157,140,245,.14), transparent 65%), var(--bg-primary); text-align:center; overflow:hidden;}
.dp-coach::before{content:""; position:absolute; inset:0; border-radius:var(--radius-lg); padding:1px; background:linear-gradient(180deg,var(--accent-primary),transparent 60%); -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); -webkit-mask-composite:xor; mask-composite:exclude; pointer-events:none; opacity:.55;}
.dp-coach__tag{display:inline-flex; align-items:center; gap:7px; font-family:var(--font-mono); font-size:9px; letter-spacing:.16em; color:var(--accent-primary-bright); border:1px solid var(--border-accent); border-radius:30px; padding:5px 13px; margin-bottom:15px;}
.dp-coach__name{font-family:var(--font-heading); font-size:21px; font-weight:700; color:var(--text-primary); letter-spacing:.01em; margin:0 0 10px;}
.dp-coach__desc{font-size:14px; color:var(--text-secondary); line-height:1.6; max-width:520px; margin:0 auto 20px;}
.dp-coach__cta{display:inline-flex; align-items:center; gap:9px; font-family:var(--font-mono); font-size:11.5px; letter-spacing:.1em; color:var(--bg-primary); background:linear-gradient(180deg,var(--accent-primary-bright),var(--accent-primary)); padding:13px 26px; border-radius:30px; box-shadow:0 0 30px -8px var(--accent-glow);}
.dp-xsell-lbl{font-family:var(--font-mono); font-size:10px; letter-spacing:.14em; color:var(--text-muted); text-align:center; margin:30px 0 4px;}

/* Sidebar two-number card */
.dp-sidecard{border:1px solid var(--border-subtle); border-radius:var(--radius-md); background:var(--bg-tertiary); padding:12px 13px;}
.dp-sidecard__row{display:flex; align-items:center; gap:9px; padding:6px 0;}
.dp-sidecard__row+.dp-sidecard__row{border-top:1px solid var(--border-subtle);}
.dp-sidecard__ic{font-size:15px; color:var(--accent-primary-bright); display:flex;}
.dp-sidecard__k{font-family:var(--font-mono); font-size:10px; color:var(--text-muted);}
.dp-sidecard__v{font-family:var(--font-heading); font-size:12px; font-weight:600; color:var(--text-primary); letter-spacing:.04em;}
.dp-sidecard__note{font-size:10.5px; color:var(--text-muted); line-height:1.45; margin-top:9px; padding-top:9px; border-top:1px solid var(--border-subtle);}
`}</style>; }
