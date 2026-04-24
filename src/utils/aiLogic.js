// Simulated rule-based AI engine for Wellness insights

export const processAssessment = (data) => {
    // Expected data structure:
    // sleep: number (hours)
    // stress: number (1-10)
    // activity: "none" | "light" | "moderate" | "intense"
    // mood: number (1-10)
    // water: number (glasses)
    // doshaProxy: "vata" | "pitta" | "kapha" | "unknown"
  
    // 1. Calculate Scores (0-100)
    let physicalScore = 50;
    
    // Sleep points
    if (data.sleep >= 7 && data.sleep <= 9) physicalScore += 20;
    else if (data.sleep >= 5) physicalScore += 10;
    else physicalScore -= 15;
    
    // Activity points
    if (data.activity === "intense") physicalScore += 20;
    else if (data.activity === "moderate") physicalScore += 15;
    else if (data.activity === "light") physicalScore += 5;
    else physicalScore -= 10;
  
    // Water points
    if (data.water >= 8) physicalScore += 10;
    else if (data.water >= 4) physicalScore += 5;
    else physicalScore -= 10;
  
    let mentalScore = 100 - (data.stress * 10) + (data.sleep * 2);
    let emotionalScore = (data.mood * 10);
  
    // Normalize to 0-100
    physicalScore = Math.max(0, Math.min(100, physicalScore));
    mentalScore = Math.max(0, Math.min(100, mentalScore));
    emotionalScore = Math.max(0, Math.min(100, emotionalScore));
  
    const energyScore = Math.floor((physicalScore + mentalScore) / 2);
    const wellnessScore = Math.floor((physicalScore + mentalScore + emotionalScore) / 3);
  
    // 2. Predict Burnout
    const burnoutRisk = (data.stress >= 7 && data.sleep <= 5) || (data.stress >= 8 && data.mood <= 4);
  
    // 3. Generate Recommendations
    const recommendations = [];
  
    if (data.sleep < 7) {
      recommendations.push("Your sleep is below optimal limits. Prioritize wind-down routines tonight.");
    }
    
    if (data.stress > 6) {
        if (data.doshaProxy === "vata") {
            recommendations.push("High stress detected. Vata dosha usually benefits from grounding exercises and warm herbal teas right now.");
        } else {
            recommendations.push("High stress detected. Consider our 10-minute guided meditation.");
        }
    }
  
    if (data.activity === "none" || data.activity === "light") {
      recommendations.push("Physical stagnation affects mental clarity. Try adding a 15-minute brisk walk today.");
    }
  
    if (data.water < 6) {
      recommendations.push("Hydration is critically low. Set an hourly water reminder.");
    }
  
    if (recommendations.length === 0) {
      recommendations.push("Your vitals are exceptionally stable. Keep up the great streak!");
    }
  
    return {
      scores: {
        wellnessScore,
        energyScore,
        physicalScore,
        mentalScore,
        emotionalScore
      },
      burnoutRisk,
      recommendations
    };
  };
  
