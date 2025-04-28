const DiseaseInformation = ({ condition }) => {
    // Information database for different skin conditions
    const diseaseInfo = {
        "nv": {
          name: "Melanocytic Nevi",
          description: "Commonly known as moles, melanocytic nevi are usually benign growths of melanocytes, the cells that produce pigment in the skin.",
          causes: [
            "Genetic factors",
            "Sun exposure during early childhood",
            "Hormonal changes during puberty and pregnancy",
            "Fair skin and light-colored eyes"
          ],
          prevention: [
            "Limiting sun exposure",
            "Regular use of sunscreen",
            "Monitoring moles for any changes",
            "Early dermatological evaluations for suspicious moles"
          ],
          complications: [
            "Risk of melanoma if changes occur",
            "Cosmetic concerns",
            "Potential irritation from clothing or shaving",
            "Rarely, transformation into malignancy"
          ]
        },
        "mel": {
          name: "Melanoma",
          description: "The most dangerous type of skin cancer, developing from melanocytes and capable of spreading to other organs rapidly if not treated early.",
          causes: [
            "Ultraviolet (UV) radiation exposure",
            "Family history of melanoma",
            "Having many or atypical moles",
            "Fair skin, freckling, and light hair"
          ],
          prevention: [
            "Applying broad-spectrum sunscreen",
            "Wearing protective clothing",
            "Avoiding tanning beds",
            "Regular skin checks and dermatologist visits"
          ],
          complications: [
            "Metastasis to lymph nodes and distant organs",
            "Extensive surgical removal",
            "Recurrence even after treatment",
            "Decreased survival rate if diagnosed late"
          ]
        },
        "bkl": {
          name: "Benign Keratosis-Like Lesions",
          description: "A group of non-cancerous skin lesions that include seborrheic keratoses and solar lentigines.",
          causes: [
            "Natural skin aging",
            "Sun exposure",
            "Genetic predisposition",
            "Skin friction or irritation"
          ],
          prevention: [
            "Sun protection",
            "Skin hydration",
            "Avoiding unnecessary skin trauma",
            "Regular monitoring for changes"
          ],
          complications: [
            "Cosmetic concerns",
            "Potential confusion with skin cancer",
            "Irritation from rubbing against clothes",
            "Rare instances of inflammation"
          ]
        },
        "bcc": {
          name: "Basal Cell Carcinoma",
          description: "The most common form of skin cancer, usually slow-growing and rarely metastasizes, but can be locally destructive.",
          causes: [
            "Chronic sun exposure",
            "Use of tanning beds",
            "Fair skin, light eyes, and light hair",
            "Older age"
          ],
          prevention: [
            "Daily application of sunscreen",
            "Wearing hats and protective clothing",
            "Seeking shade during peak sun hours",
            "Regular skin examinations"
          ],
          complications: [
            "Local tissue destruction",
            "Possible disfigurement",
            "Recurrence after treatment",
            "Rare spread beyond the skin"
          ]
        },
        "vasc": {
          name: "Pyogenic Granulomas and Hemorrhage",
          description: "Small, reddish bumps on the skin that bleed easily due to an overgrowth of capillaries, often following minor injury.",
          causes: [
            "Minor skin injuries",
            "Hormonal changes (especially during pregnancy)",
            "Medications such as oral retinoids",
            "Unknown spontaneous development"
          ],
          prevention: [
            "Protecting skin from injuries",
            "Careful monitoring of skin during pregnancy",
            "Managing underlying medical conditions",
            "Early treatment to prevent bleeding"
          ],
          complications: [
            "Frequent bleeding",
            "Secondary infection",
            "Recurrence after removal",
            "Cosmetic concerns"
          ]
        },
        "akiec": {
          name: "Actinic Keratoses and Intraepithelial Carcinomae",
          description: "Precancerous skin lesions caused by long-term sun exposure that can progress to squamous cell carcinoma.",
          causes: [
            "Chronic exposure to UV radiation",
            "Fair skin and light-colored eyes",
            "Older age",
            "Immunosuppression"
          ],
          prevention: [
            "Strict sun protection measures",
            "Regular use of high-SPF sunscreen",
            "Avoiding tanning beds",
            "Routine dermatological skin checks"
          ],
          complications: [
            "Progression to invasive squamous cell carcinoma",
            "Need for multiple treatments",
            "Scarring from treatment",
            "Emotional distress over persistent lesions"
          ]
        },
        "df": {
          name: "Dermatofibroma",
          description: "A common benign skin growth often found on the legs, characterized by firm, raised bumps that may appear reddish-brown.",
          causes: [
            "Minor skin trauma (e.g., insect bites, thorn pricks)",
            "Immune system response to minor injury",
            "Unknown triggers in many cases",
            "More frequent occurrence in women"
          ],
          prevention: [
            "General skin care",
            "Avoidance of skin trauma",
            "Prompt treatment of skin injuries",
            "Monitoring existing lesions for any changes"
          ],
          complications: [
            "Cosmetic concerns",
            "Mild itching or tenderness",
            "Rare misdiagnosis as a more serious condition",
            "Persistence without spontaneous resolution"
          ]
        }
    };
  
    // Transform condition name to lowercase for matching
    const normalizedCondition = condition ? condition.toLowerCase() : "";
    
    // Find matching condition info or use default unknown message
    const info = diseaseInfo[normalizedCondition] || {
      name: condition || "Unknown Condition",
      description: "Detailed information not available for this condition.",
      causes: ["Specific causes unknown or not available"],
      prevention: ["Consult with a dermatologist for prevention advice"],
      complications: ["Information not available"]
    };
  
    return (
      <div className="p-5 border-t border-gray-100">
        <h3 className="text-sm font-medium text-gray-800 mb-3">
          Condition Information
        </h3>
        <div className="bg-white border border-emerald-100 rounded-lg overflow-hidden">
          <div className="bg-emerald-50 p-3 border-b border-emerald-100">
            <h4 className="font-medium text-emerald-800">{info.name}</h4>
            <p className="text-sm text-emerald-700 mt-1">{info.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-emerald-100">
            {/* Causes */}
            <div className="p-4">
              <h5 className="font-medium text-sm mb-2 text-gray-700 flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                Causes
              </h5>
              <ul className="text-xs space-y-2 text-gray-600">
                {info.causes.map((item, index) => (
                  <li key={`cause-${index}`} className="flex items-start">
                    <span className="mr-2 text-emerald-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Prevention */}
            <div className="p-4">
              <h5 className="font-medium text-sm mb-2 text-gray-700 flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                Prevention
              </h5>
              <ul className="text-xs space-y-2 text-gray-600">
                {info.prevention.map((item, index) => (
                  <li key={`prevention-${index}`} className="flex items-start">
                    <span className="mr-2 text-emerald-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Complications */}
            <div className="p-4">
              <h5 className="font-medium text-sm mb-2 text-gray-700 flex items-center">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                Complications
              </h5>
              <ul className="text-xs space-y-2 text-gray-600">
                {info.complications.map((item, index) => (
                  <li key={`complication-${index}`} className="flex items-start">
                    <span className="mr-2 text-emerald-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 text-xs text-gray-500 italic border-t border-gray-100">
            Note: This information is provided for educational purposes only. Always consult with a healthcare professional for proper diagnosis and treatment.
          </div>
        </div>
      </div>
    );
  };

  export default DiseaseInformation