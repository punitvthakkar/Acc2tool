// Define the financial formulas and their categories
const formulas = {
    "I. Basic Profitability & Cost Structure": [
        {
            id: 1,
            name: "Revenue",
            description: "Revenue = Sales Price per unit × Sales Volume (units)",
            variables: [
                { name: "revenue", label: "Revenue ($)", calculated: true },
                { name: "salesPrice", label: "Sales Price per unit ($)" },
                { name: "salesVolume", label: "Sales Volume (units)" }
            ],
            calculate: function(inputs) {
                if (inputs.revenue === null) return { revenue: inputs.salesPrice * inputs.salesVolume };
                if (inputs.salesPrice === null) return { salesPrice: inputs.revenue / inputs.salesVolume };
                if (inputs.salesVolume === null) return { salesVolume: inputs.revenue / inputs.salesPrice };
                return {};
            }
        },
        {
            id: 2,
            name: "Contribution from Revenue and Variable Costs",
            description: "Contribution = Revenue – Variable Costs",
            variables: [
                { name: "contribution", label: "Contribution ($)", calculated: true },
                { name: "revenue", label: "Revenue ($)" },
                { name: "variableCosts", label: "Variable Costs ($)" }
            ],
            calculate: function(inputs) {
                if (inputs.contribution === null) return { contribution: inputs.revenue - inputs.variableCosts };
                if (inputs.revenue === null) return { revenue: inputs.contribution + inputs.variableCosts };
                if (inputs.variableCosts === null) return { variableCosts: inputs.revenue - inputs.contribution };
                return {};
            }
        },
        {
            id: 3,
            name: "Contribution from Operating Profit and Fixed Costs",
            description: "Contribution = Operating Profit + Fixed Costs",
            variables: [
                { name: "contribution", label: "Contribution ($)", calculated: true },
                { name: "operatingProfit", label: "Operating Profit ($)" },
                { name: "fixedCosts", label: "Fixed Costs ($)" }
            ],
            calculate: function(inputs) {
                if (inputs.contribution === null) return { contribution: inputs.operatingProfit + inputs.fixedCosts };
                if (inputs.operatingProfit === null) return { operatingProfit: inputs.contribution - inputs.fixedCosts };
                if (inputs.fixedCosts === null) return { fixedCosts: inputs.contribution - inputs.operatingProfit };
                return {};
            }
        },
        {
            id: 4,
            name: "Operating Profit from Revenue and Costs",
            description: "Operating Profit = Revenue – Operating Costs (where OpCosts = VarCosts + FixedCosts)",
            variables: [
                { name: "operatingProfit", label: "Operating Profit ($)", calculated: true },
                { name: "revenue", label: "Revenue ($)" },
                { name: "variableCosts", label: "Variable Costs ($)" },
                { name: "fixedCosts", label: "Fixed Costs ($)" }
            ],
            calculate: function(inputs) {
                const operatingCosts = (inputs.variableCosts !== null && inputs.fixedCosts !== null) 
                    ? inputs.variableCosts + inputs.fixedCosts 
                    : null;
                
                if (inputs.operatingProfit === null && inputs.revenue !== null && operatingCosts !== null) 
                    return { operatingProfit: inputs.revenue - operatingCosts };
                
                if (inputs.revenue === null && inputs.operatingProfit !== null && operatingCosts !== null) 
                    return { revenue: inputs.operatingProfit + operatingCosts };
                
                if (inputs.variableCosts === null && inputs.revenue !== null && inputs.operatingProfit !== null && inputs.fixedCosts !== null) 
                    return { variableCosts: inputs.revenue - inputs.operatingProfit - inputs.fixedCosts };
                
                if (inputs.fixedCosts === null && inputs.revenue !== null && inputs.operatingProfit !== null && inputs.variableCosts !== null) 
                    return { fixedCosts: inputs.revenue - inputs.operatingProfit - inputs.variableCosts };
                
                return {};
            }
        },
        {
            id: 5,
            name: "Operating Profit from Contribution and Fixed Costs",
            description: "Operating Profit = Contribution – Fixed Costs",
            variables: [
                { name: "operatingProfit", label: "Operating Profit ($)", calculated: true },
                { name: "contribution", label: "Contribution ($)" },
                { name: "fixedCosts", label: "Fixed Costs ($)" }
            ],
            calculate: function(inputs) {
                if (inputs.operatingProfit === null) return { operatingProfit: inputs.contribution - inputs.fixedCosts };
                if (inputs.contribution === null) return { contribution: inputs.operatingProfit + inputs.fixedCosts };
                if (inputs.fixedCosts === null) return { fixedCosts: inputs.contribution - inputs.operatingProfit };
                return {};
            }
        },
        {
            id: 6,
            name: "Variable Costs",
            description: "Variable Costs = Revenue – Contribution",
            variables: [
                { name: "variableCosts", label: "Variable Costs ($)", calculated: true },
                { name: "revenue", label: "Revenue ($)" },
                { name: "contribution", label: "Contribution ($)" }
            ],
            calculate: function(inputs) {
                if (inputs.variableCosts === null) return { variableCosts: inputs.revenue - inputs.contribution };
                if (inputs.revenue === null) return { revenue: inputs.variableCosts + inputs.contribution };
                if (inputs.contribution === null) return { contribution: inputs.revenue - inputs.variableCosts };
                return {};
            }
        },
        {
            id: 7,
            name: "Fixed Costs",
            description: "Fixed Costs = Contribution – Operating Profit",
            variables: [
                { name: "fixedCosts", label: "Fixed Costs ($)", calculated: true },
                { name: "contribution", label: "Contribution ($)" },
                { name: "operatingProfit", label: "Operating Profit ($)" }
            ],
            calculate: function(inputs) {
                if (inputs.fixedCosts === null) return { fixedCosts: inputs.contribution - inputs.operatingProfit };
                if (inputs.contribution === null) return { contribution: inputs.fixedCosts + inputs.operatingProfit };
                if (inputs.operatingProfit === null) return { operatingProfit: inputs.contribution - inputs.fixedCosts };
                return {};
            }
        }
    ],
    "II. Profitability Ratios & Advanced Financial Metrics": [
        {
            id: 8,
            name: "Operating Profit Margin",
            description: "Operating Profit Margin (%) = Operating Profit / Revenue",
            variables: [
                { name: "operatingProfitMargin", label: "Operating Profit Margin (%)", calculated: true },
                { name: "operatingProfit", label: "Operating Profit ($)" },
                { name: "revenue", label: "Revenue ($)" }
            ],
            calculate: function(inputs) {
                if (inputs.operatingProfitMargin === null) 
                    return { operatingProfitMargin: (inputs.operatingProfit / inputs.revenue) * 100 };
                
                if (inputs.operatingProfit === null) 
                    return { operatingProfit: (inputs.operatingProfitMargin / 100) * inputs.revenue };
                
                if (inputs.revenue === null) 
                    return { revenue: (inputs.operatingProfit / (inputs.operatingProfitMargin / 100)) };
                
                return {};
            }
        },
        {
            id: 9,
            name: "Return on Invested Capital (ROIC)",
            description: "Return on Invested Capital (ROIC) (%) = Operating Profit / Invested Capital",
            variables: [
                { name: "roic", label: "Return on Invested Capital (%)", calculated: true },
                { name: "operatingProfit", label: "Operating Profit ($)" },
                { name: "investedCapital", label: "Invested Capital ($)" }
            ],
            calculate: function(inputs) {
                if (inputs.roic === null) 
                    return { roic: (inputs.operatingProfit / inputs.investedCapital) * 100 };
                
                if (inputs.operatingProfit === null) 
                    return { operatingProfit: (inputs.roic / 100) * inputs.investedCapital };
                
                if (inputs.investedCapital === null) 
                    return { investedCapital: inputs.operatingProfit / (inputs.roic / 100) };
                
                return {};
            }
        },
        {
            id: 10,
            name: "Financing Costs",
            description: "Financing Costs = Invested Capital (IC) × Cost of Invested Capital (COIC %)",
            variables: [
                { name: "financingCosts", label: "Financing Costs ($)", calculated: true },
                { name: "investedCapital", label: "Invested Capital ($)" },
                { name: "coic", label: "Cost of Invested Capital (%)" }
            ],
            calculate: function(inputs) {
                if (inputs.financingCosts === null) 
                    return { financingCosts: inputs.investedCapital * (inputs.coic / 100) };
                
                if (inputs.investedCapital === null) 
                    return { investedCapital: inputs.financingCosts / (inputs.coic / 100) };
                
                if (inputs.coic === null) 
                    return { coic: (inputs.financingCosts / inputs.investedCapital) * 100 };
                
                return {};
            }
        },
        {
            id: 11,
            name: "Economic Profit from Operating Profit and Financing Costs",
            description: "Economic Profit (EP) = Operating Profit – Financing Costs",
            variables: [
                { name: "economicProfit", label: "Economic Profit ($)", calculated: true },
                { name: "operatingProfit", label: "Operating Profit ($)" },
                { name: "financingCosts", label: "Financing Costs ($)" }
            ],
            calculate: function(inputs) {
                if (inputs.economicProfit === null) 
                    return { economicProfit: inputs.operatingProfit - inputs.financingCosts };
                
                if (inputs.operatingProfit === null) 
                    return { operatingProfit: inputs.economicProfit + inputs.financingCosts };
                
                if (inputs.financingCosts === null) 
                    return { financingCosts: inputs.operatingProfit - inputs.economicProfit };
                
                return {};
            }
        },
        {
            id: 12,
            name: "Economic Profit from Operating Profit, Invested Capital, and COIC",
            description: "Economic Profit (EP) = Operating Profit – (Invested Capital × COIC)",
            variables: [
                { name: "economicProfit", label: "Economic Profit ($)", calculated: true },
                { name: "operatingProfit", label: "Operating Profit ($)" },
                { name: "investedCapital", label: "Invested Capital ($)" },
                { name: "coic", label: "Cost of Invested Capital (%)" }
            ],
            calculate: function(inputs) {
                const financingCosts = (inputs.investedCapital !== null && inputs.coic !== null) 
                    ? inputs.investedCapital * (inputs.coic / 100) 
                    : null;
                
                if (inputs.economicProfit === null && inputs.operatingProfit !== null && financingCosts !== null) 
                    return { economicProfit: inputs.operatingProfit - financingCosts };
                
                if (inputs.operatingProfit === null && inputs.economicProfit !== null && financingCosts !== null) 
                    return { operatingProfit: inputs.economicProfit + financingCosts };
                
                if (inputs.coic === null && inputs.economicProfit !== null && inputs.operatingProfit !== null && inputs.investedCapital !== null) 
                    return { coic: ((inputs.operatingProfit - inputs.economicProfit) / inputs.investedCapital) * 100 };
                
                if (inputs.investedCapital === null && inputs.economicProfit !== null && inputs.operatingProfit !== null && inputs.coic !== null) 
                    return { investedCapital: (inputs.operatingProfit - inputs.economicProfit) / (inputs.coic / 100) };
                
                return {};
            }
        },
        {
            id: 13,
            name: "Economic Profit from ROIC, COIC, and Invested Capital",
            description: "Economic Profit (EP) = (ROIC – COIC) × Invested Capital",
            variables: [
                { name: "economicProfit", label: "Economic Profit ($)", calculated: true },
                { name: "roic", label: "Return on Invested Capital (%)" },
                { name: "coic", label: "Cost of Invested Capital (%)" },
                { name: "investedCapital", label: "Invested Capital ($)" }
            ],
            calculate: function(inputs) {
                if (inputs.economicProfit === null) 
                    return { economicProfit: ((inputs.roic - inputs.coic) / 100) * inputs.investedCapital };
                
                if (inputs.roic === null) 
                    return { roic: ((inputs.economicProfit / inputs.investedCapital) * 100) + inputs.coic };
                
                if (inputs.coic === null) 
                    return { coic: inputs.roic - ((inputs.economicProfit / inputs.investedCapital) * 100) };
                
                if (inputs.investedCapital === null) 
                    return { investedCapital: inputs.economicProfit / ((inputs.roic - inputs.coic) / 100) };
                
                return {};
            }
        }
    ],
    "III. Sensitivity & Decision Analysis": [
        {
            id: 14,
            name: "Operating Leverage",
            description: "Operating Leverage (Factor) = Contribution / Operating Profit",
            variables: [
                { name: "operatingLeverage", label: "Operating Leverage (Factor)", calculated: true },
                { name: "contribution", label: "Contribution ($)" },
                { name: "operatingProfit", label: "Operating Profit ($)" }
            ],
            calculate: function(inputs) {
                if (inputs.operatingLeverage === null) 
                    return { operatingLeverage: inputs.contribution / inputs.operatingProfit };
                
                if (inputs.contribution === null) 
                    return { contribution: inputs.operatingLeverage * inputs.operatingProfit };
                
                if (inputs.operatingProfit === null) 
                    return { operatingProfit: inputs.contribution / inputs.operatingLeverage };
                
                return {};
            }
        },
        {
            id: 15,
            name: "Change in Operating Profit",
            description: "% Change in Operating Profit = % Change in Sales Volume × Operating Leverage",
            variables: [
                { name: "operatingProfitChange", label: "Change in Operating Profit (%)", calculated: true },
                { name: "salesVolumeChange", label: "Change in Sales Volume (%)" },
                { name: "operatingLeverage", label: "Operating Leverage (Factor)" }
            ],
            calculate: function(inputs) {
                if (inputs.operatingProfitChange === null) 
                    return { operatingProfitChange: inputs.salesVolumeChange * inputs.operatingLeverage };
                
                if (inputs.salesVolumeChange === null) 
                    return { salesVolumeChange: inputs.operatingProfitChange / inputs.operatingLeverage };
                
                if (inputs.operatingLeverage === null) 
                    return { operatingLeverage: inputs.operatingProfitChange / inputs.salesVolumeChange };
                
                return {};
            }
        },
        {
            id: 16,
            name: "Break-Even Units",
            description: "Break-Even Units = Fixed Costs / Contribution per unit",
            variables: [
                { name: "breakEvenUnits", label: "Break-Even Units", calculated: true },
                { name: "fixedCosts", label: "Fixed Costs ($)" },
                { name: "pricePerUnit", label: "Price per unit ($)" },
                { name: "variableCostPerUnit", label: "Variable Cost per unit ($)" }
            ],
            calculate: function(inputs) {
                const contributionPerUnit = (inputs.pricePerUnit !== null && inputs.variableCostPerUnit !== null) 
                    ? inputs.pricePerUnit - inputs.variableCostPerUnit 
                    : null;
                
                if (inputs.breakEvenUnits === null && contributionPerUnit !== null && inputs.fixedCosts !== null) 
                    return { breakEvenUnits: inputs.fixedCosts / contributionPerUnit };
                
                if (inputs.fixedCosts === null && contributionPerUnit !== null && inputs.breakEvenUnits !== null) 
                    return { fixedCosts: inputs.breakEvenUnits * contributionPerUnit };
                
                if (inputs.pricePerUnit === null && inputs.breakEvenUnits !== null && inputs.fixedCosts !== null && inputs.variableCostPerUnit !== null) 
                    return { pricePerUnit: (inputs.fixedCosts / inputs.breakEvenUnits) + inputs.variableCostPerUnit };
                
                if (inputs.variableCostPerUnit === null && inputs.breakEvenUnits !== null && inputs.fixedCosts !== null && inputs.pricePerUnit !== null) 
                    return { variableCostPerUnit: inputs.pricePerUnit - (inputs.fixedCosts / inputs.breakEvenUnits) };
                
                return {};
            }
        },
        {
            id: 17,
            name: "Required Volume Increase",
            description: "% Volume Increase Needed = (Old Contribution per unit - New Contribution per unit) / New Contribution per unit",
            variables: [
                { name: "volumeIncreaseNeeded", label: "Volume Increase Needed (%)", calculated: true },
                { name: "oldContributionPerUnit", label: "Old Contribution per unit ($)" },
                { name: "newContributionPerUnit", label: "New Contribution per unit ($)" }
            ],
            calculate: function(inputs) {
                if (inputs.volumeIncreaseNeeded === null) 
                    return { volumeIncreaseNeeded: ((inputs.oldContributionPerUnit - inputs.newContributionPerUnit) / inputs.newContributionPerUnit) * 100 };
                
                if (inputs.oldContributionPerUnit === null) 
                    return { oldContributionPerUnit: inputs.newContributionPerUnit * (1 + (inputs.volumeIncreaseNeeded / 100)) };
                
                if (inputs.newContributionPerUnit === null) 
                    return { newContributionPerUnit: inputs.oldContributionPerUnit / (1 + (inputs.volumeIncreaseNeeded / 100)) };
                
                return {};
            }
        }
    ],
    "IV. Cost Allocation & Asset Valuation": [
        {
            id: 18,
            name: "Full Cost",
            description: "Full Cost (Traceability) = Direct Costs + Indirect Costs",
            variables: [
                { name: "fullCost", label: "Full Cost ($)", calculated: true },
                { name: "directCosts", label: "Direct Costs ($)" },
                { name: "indirectCosts", label: "Indirect Costs ($)" }
            ],
            calculate: function(inputs) {
                if (inputs.fullCost === null) 
                    return { fullCost: inputs.directCosts + inputs.indirectCosts };
                
                if (inputs.directCosts === null) 
                    return { directCosts: inputs.fullCost - inputs.indirectCosts };
                
                if (inputs.indirectCosts === null) 
                    return { indirectCosts: inputs.fullCost - inputs.directCosts };
                
                return {};
            }
        },
        {
            id: 19,
            name: "Allocated Indirect Costs",
            description: "Allocated Indirect Costs to Product = Total Indirect Costs × (Product's Direct Costs / Total Direct Costs for all products)",
            variables: [
                { name: "allocatedIndirectCosts", label: "Allocated Indirect Costs ($)", calculated: true },
                { name: "totalIndirectCosts", label: "Total Indirect Costs ($)" },
                { name: "productDirectCosts", label: "Product's Direct Costs ($)" },
                { name: "totalDirectCosts", label: "Total Direct Costs for all products ($)" }
            ],
            calculate: function(inputs) {
                if (inputs.allocatedIndirectCosts === null) 
                    return { allocatedIndirectCosts: inputs.totalIndirectCosts * (inputs.productDirectCosts / inputs.totalDirectCosts) };
                
                if (inputs.totalIndirectCosts === null) 
                    return { totalIndirectCosts: inputs.allocatedIndirectCosts / (inputs.productDirectCosts / inputs.totalDirectCosts) };
                
                if (inputs.productDirectCosts === null) 
                    return { productDirectCosts: (inputs.allocatedIndirectCosts * inputs.totalDirectCosts) / inputs.totalIndirectCosts };
                
                if (inputs.totalDirectCosts === null) 
                    return { totalDirectCosts: (inputs.totalIndirectCosts * inputs.productDirectCosts) / inputs.allocatedIndirectCosts };
                
                return {};
            }
        },
        {
            id: 20,
            name: "Straight-Line Depreciation",
            description: "Straight-Line Depreciation = (Asset Cost – Salvage Value) / Useful Life",
            variables: [
                { name: "depreciation", label: "Annual Depreciation ($)", calculated: true },
                { name: "assetCost", label: "Asset Cost ($)" },
                { name: "salvageValue", label: "Salvage Value ($)" },
                { name: "usefulLife", label: "Useful Life (years)" }
            ],
            calculate: function(inputs) {
                if (inputs.depreciation === null) 
                    return { depreciation: (inputs.assetCost - inputs.salvageValue) / inputs.usefulLife };
                
                if (inputs.assetCost === null) 
                    return { assetCost: (inputs.depreciation * inputs.usefulLife) + inputs.salvageValue };
                
                if (inputs.salvageValue === null) 
                    return { salvageValue: inputs.assetCost - (inputs.depreciation * inputs.usefulLife) };
                
                if (inputs.usefulLife === null) 
                    return { usefulLife: (inputs.assetCost - inputs.salvageValue) / inputs.depreciation };
                
                return {};
            }
        },
        {
            id: 21,
            name: "Asset Cost per Product",
            description: "Asset Cost (Depreciation + Financing) per product = (Total Annual Depreciation / Annual Production Volume) + ((Asset Value × COIC %) / Annual Production Volume)",
            variables: [
                { name: "assetCostPerProduct", label: "Asset Cost per Product ($)", calculated: true },
                { name: "totalAnnualDepreciation", label: "Total Annual Depreciation ($)" },
                { name: "assetValue", label: "Asset Value ($)" },
                { name: "coic", label: "Cost of Invested Capital (%)" },
                { name: "annualProductionVolume", label: "Annual Production Volume (units)" }
            ],
            calculate: function(inputs) {
                const depreciationCostPerProduct = (inputs.totalAnnualDepreciation !== null && inputs.annualProductionVolume !== null) 
                    ? inputs.totalAnnualDepreciation / inputs.annualProductionVolume
                    : null;
                
                const financingCostPerProduct = (inputs.assetValue !== null && inputs.coic !== null && inputs.annualProductionVolume !== null) 
                    ? (inputs.assetValue * (inputs.coic / 100)) / inputs.annualProductionVolume
                    : null;
                
                if (inputs.assetCostPerProduct === null && depreciationCostPerProduct !== null && financingCostPerProduct !== null) 
                    return { assetCostPerProduct: depreciationCostPerProduct + financingCostPerProduct };
                
                // For solving other variables, we need specific cases depending on which variable is missing
                // This is more complex and would require solving simultaneous equations in some cases
                // The following are simplified approaches for when one variable is missing
                
                if (inputs.totalAnnualDepreciation === null && 
                    inputs.assetCostPerProduct !== null && 
                    inputs.assetValue !== null && 
                    inputs.coic !== null && 
                    inputs.annualProductionVolume !== null) {
                    
                    const totalFinancingCost = (inputs.assetValue * (inputs.coic / 100));
                    const totalCost = inputs.assetCostPerProduct * inputs.annualProductionVolume;
                    return { totalAnnualDepreciation: totalCost - totalFinancingCost };
                }
                
                if (inputs.assetValue === null && 
                    inputs.assetCostPerProduct !== null && 
                    inputs.totalAnnualDepreciation !== null && 
                    inputs.coic !== null && 
                    inputs.annualProductionVolume !== null) {
                    
                    const totalCost = inputs.assetCostPerProduct * inputs.annualProductionVolume;
                    const totalDepreciationCost = inputs.totalAnnualDepreciation;
                    const totalFinancingCost = totalCost - totalDepreciationCost;
                    return { assetValue: (totalFinancingCost / (inputs.coic / 100)) };
                }
                
                if (inputs.coic === null && 
                    inputs.assetCostPerProduct !== null && 
                    inputs.totalAnnualDepreciation !== null && 
                    inputs.assetValue !== null && 
                    inputs.annualProductionVolume !== null) {
                    
                    const totalCost = inputs.assetCostPerProduct * inputs.annualProductionVolume;
                    const totalDepreciationCost = inputs.totalAnnualDepreciation;
                    const totalFinancingCost = totalCost - totalDepreciationCost;
                    return { coic: (totalFinancingCost / inputs.assetValue) * 100 };
                }
                
                if (inputs.annualProductionVolume === null && 
                    inputs.assetCostPerProduct !== null && 
                    inputs.totalAnnualDepreciation !== null && 
                    inputs.assetValue !== null && 
                    inputs.coic !== null) {
                    
                    const totalFinancingCost = (inputs.assetValue * (inputs.coic / 100));
                    const totalCost = inputs.totalAnnualDepreciation + totalFinancingCost;
                    return { annualProductionVolume: totalCost / inputs.assetCostPerProduct };
                }
                
                return {};
            }
        }
    ],
    "V. Internal Pricing": [
        {
            id: 22,
            name: "Optimal Internal Transfer Price",
            description: "Scenarios for determining the Optimal Internal Transfer Price",
            variables: [
                { name: "scenario", label: "Capacity Scenario", type: "select", options: ["Scenario 1: NO available capacity", "Scenario 2: HAS available capacity"] },
                { name: "marketPrice", label: "Market Price (supplier's external) ($)" },
                { name: "supplierVariableCost", label: "Supplier's Variable Cost ($)" },
                { name: "buyerExternalPrice", label: "Buyer's External Purchase Price ($)" }
            ],
            // This formula is special - it's more of a decision helper
            calculate: function(inputs) {
                // No automatic calculation for this one - we'll handle it specifically
                return {};
            }
        }
    ],
    "VI. Specific Project/Decision Evaluation": [
        {
            id: 23,
            name: "Incremental Economic Profit",
            description: "Incremental Economic Profit (EP) = Incremental Operating Profit – (Incremental Invested Capital × COIC)",
            variables: [
                { name: "incrementalEP", label: "Incremental Economic Profit ($)", calculated: true },
                { name: "incrementalOperatingProfit", label: "Incremental Operating Profit ($)" },
                { name: "incrementalInvestedCapital", label: "Incremental Invested Capital ($)" },
                { name: "coic", label: "Cost of Invested Capital (%)" }
            ],
            calculate: function(inputs) {
                if (inputs.incrementalEP === null) 
                    return { incrementalEP: inputs.incrementalOperatingProfit - (inputs.incrementalInvestedCapital * (inputs.coic / 100)) };
                
                if (inputs.incrementalOperatingProfit === null) 
                    return { incrementalOperatingProfit: inputs.incrementalEP + (inputs.incrementalInvestedCapital * (inputs.coic / 100)) };
                
                if (inputs.incrementalInvestedCapital === null && inputs.coic !== null) 
                    return { incrementalInvestedCapital: (inputs.incrementalOperatingProfit - inputs.incrementalEP) / (inputs.coic / 100) };
                
                if (inputs.coic === null && inputs.incrementalInvestedCapital !== null) 
                    return { coic: ((inputs.incrementalOperatingProfit - inputs.incrementalEP) / inputs.incrementalInvestedCapital) * 100 };
                
                return {};
            }
        },
        {
            id: 24,
            name: "Financing Cost of Delayed Payment",
            description: "Financing Cost of Delayed Payment = Amount of Receivable × COIC % × (Delay Period in months / 12)",
            variables: [
                { name: "financingCostDelayed", label: "Financing Cost of Delayed Payment ($)", calculated: true },
                { name: "receivableAmount", label: "Amount of Receivable ($)" },
                { name: "coic", label: "Cost of Invested Capital (%)" },
                { name: "delayPeriod", label: "Delay Period (months)" }
            ],
            calculate: function(inputs) {
                if (inputs.financingCostDelayed === null) 
                    return { financingCostDelayed: inputs.receivableAmount * (inputs.coic / 100) * (inputs.delayPeriod / 12) };
                
                if (inputs.receivableAmount === null) 
                    return { receivableAmount: inputs.financingCostDelayed / ((inputs.coic / 100) * (inputs.delayPeriod / 12)) };
                
                if (inputs.coic === null) 
                    return { coic: (inputs.financingCostDelayed / (inputs.receivableAmount * (inputs.delayPeriod / 12))) * 100 };
                
                if (inputs.delayPeriod === null) 
                    return { delayPeriod: (inputs.financingCostDelayed / (inputs.receivableAmount * (inputs.coic / 100))) * 12 };
                
                return {};
            }
        }
    ]
};

// DOM elements
const formulaSearch = document.getElementById('formula-search');
const formulaListNav = document.getElementById('formula-list-nav');
const calculatorForm = document.getElementById('calculator-form');
const resultArea = document.getElementById('result-area');
const errorMessageArea = document.getElementById('error-message-area');
const clearButton = document.getElementById('clear-button');
const formulaTitle = document.getElementById('formula-title');
const formulaDescription = document.getElementById('formula-description');
const formula22Output = document.getElementById('formula-22-output');

// Global state
let currentFormula = null;
let currentInputs = {};

// Initialize the calculator
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the formula list
    initFormulaList();
    
    // Set up event listeners
    formulaSearch.addEventListener('input', filterFormulas);
    clearButton.addEventListener('click', clearInputFields);
    
    // Initialize with a hidden result area
    resultArea.classList.add('hidden');
    errorMessageArea.classList.add('hidden');
});

// Initialize the formula list in the sidebar
function initFormulaList() {
    formulaListNav.innerHTML = '';
    
    for (const category in formulas) {
        // Create category header
        const categoryHeader = document.createElement('h3');
        categoryHeader.textContent = category;
        formulaListNav.appendChild(categoryHeader);
        
        // Create formula list for this category
        const formulaList = document.createElement('ul');
        
        // Add formula links
        formulas[category].forEach(formula => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = formula.name;
            link.dataset.id = formula.id;
            link.addEventListener('click', function(e) {
                e.preventDefault();
                selectFormula(formula);
            });
            
            listItem.appendChild(link);
            formulaList.appendChild(listItem);
        });
        
        formulaListNav.appendChild(formulaList);
    }
}

// Filter formulas based on search input
function filterFormulas() {
    const searchTerm = formulaSearch.value.toLowerCase();
    
    // Get all formula links
    const formulaLinks = formulaListNav.querySelectorAll('li a');
    
    // Show/hide formulas based on search term
    formulaLinks.forEach(link => {
        const formulaName = link.textContent.toLowerCase();
        const listItem = link.parentElement;
        
        if (formulaName.includes(searchTerm)) {
            listItem.style.display = 'block';
        } else {
            listItem.style.display = 'none';
        }
    });
    
    // Show/hide category headers if all formulas in a category are hidden
    const categoryHeaders = formulaListNav.querySelectorAll('h3');
    
    categoryHeaders.forEach(header => {
        const nextSibling = header.nextElementSibling;
        if (nextSibling && nextSibling.tagName === 'UL') {
            const visibleItems = nextSibling.querySelectorAll('li[style="display: block;"]');
            
            if (visibleItems.length === 0) {
                header.style.display = 'none';
            } else {
                header.style.display = 'block';
            }
        }
    });
}

// Select a formula and display its input fields
function selectFormula(formula) {
    // Update current formula
    currentFormula = formula;
    
    // Reset inputs and clear error messages
    currentInputs = {};
    errorMessageArea.classList.add('hidden');
    resultArea.classList.add('hidden');
    
    // Update formula title and description
    formulaTitle.textContent = formula.name;
    formulaDescription.textContent = formula.description;
    
    // Clear previous form
    calculatorForm.innerHTML = '';
    
    // Special handling for Formula 22 (Internal Transfer Price)
    if (formula.id === 22) {
        formula22Output.style.display = 'none';
        createFormula22Form();
    } else {
        formula22Output.style.display = 'none';
        createStandardFormulaForm(formula);
    }
    
    // Update active formula in sidebar
    const formulaLinks = formulaListNav.querySelectorAll('a');
    formulaLinks.forEach(link => {
        if (parseInt(link.dataset.id) === formula.id) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Create input fields for standard formulas
function createStandardFormulaForm(formula) {
    formula.variables.forEach(variable => {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group';
        
        // Create label
        const label = document.createElement('label');
        label.htmlFor = variable.name;
        label.textContent = variable.label;
        
        // Add tooltip if there's a special note
        if (variable.tooltip) {
            const tooltipSpan = document.createElement('span');
            tooltipSpan.className = 'tooltip-trigger';
            tooltipSpan.textContent = ' ℹ️';
            label.appendChild(tooltipSpan);
            
            const tooltipText = document.createElement('span');
            tooltipText.className = 'tooltip-text';
            tooltipText.textContent = variable.tooltip;
            label.appendChild(tooltipText);
        }
        
        // Create input field
        const input = document.createElement('input');
        input.type = 'number';
        input.id = variable.name;
        input.name = variable.name;
        input.step = 'any'; // Allow decimal values
        
        // If this is a calculated field, mark it
        if (variable.calculated) {
            input.classList.add('is-calculated');
            input.placeholder = 'Will be calculated';
        }
        
        // Set up event listener
        input.addEventListener('input', handleInputChange);
        input.addEventListener('blur', calculateResult);
        
        // Add to the DOM
        inputGroup.appendChild(label);
        inputGroup.appendChild(input);
        calculatorForm.appendChild(inputGroup);
    });
}

// Create the special form for Formula 22 (Internal Transfer Price)
function createFormula22Form() {
    currentFormula.variables.forEach(variable => {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group';
        
        // Create label
        const label = document.createElement('label');
        label.htmlFor = variable.name;
        label.textContent = variable.label;
        
        let input;
        
        // Check if this is a select field
        if (variable.type === 'select') {
            input = document.createElement('select');
            input.id = variable.name;
            input.name = variable.name;
            
            // Add options
            variable.options.forEach(optionText => {
                const option = document.createElement('option');
                option.value = optionText;
                option.textContent = optionText;
                input.appendChild(option);
            });
            
            // Add change event listener for select
            input.addEventListener('change', handleFormula22Change);
        } else {
            // Create regular input field
            input = document.createElement('input');
            input.type = 'number';
            input.id = variable.name;
            input.name = variable.name;
            input.step = 'any'; // Allow decimal values
            
            // Set up event listener
            input.addEventListener('input', handleFormula22Change);
            input.addEventListener('blur', handleFormula22Change);
        }
        
        // Add to the DOM
        inputGroup.appendChild(label);
        inputGroup.appendChild(input);
        calculatorForm.appendChild(inputGroup);
        
        // Hide the appropriate fields based on the initial scenario
        updateFormula22Fields('Scenario 1: NO available capacity');
    });
}

// Update visible fields for Formula 22 based on selected scenario
function updateFormula22Fields(scenario) {
    const supplierVariableCostGroup = document.getElementById('supplierVariableCost').closest('.input-group');
    const buyerExternalPriceGroup = document.getElementById('buyerExternalPrice').closest('.input-group');
    const marketPriceGroup = document.getElementById('marketPrice').closest('.input-group');
    
    if (scenario === 'Scenario 1: NO available capacity') {
        // Show only market price
        marketPriceGroup.style.display = 'block';
        supplierVariableCostGroup.style.display = 'none';
        buyerExternalPriceGroup.style.display = 'none';
    } else {
        // Show supplier variable cost and buyer external price
        marketPriceGroup.style.display = 'none';
        supplierVariableCostGroup.style.display = 'block';
        buyerExternalPriceGroup.style.display = 'block';
    }
}

// Handle input change for Formula 22
function handleFormula22Change(event) {
    const scenarioSelect = document.getElementById('scenario');
    const selectedScenario = scenarioSelect.value;
    
    // Update visible fields based on scenario
    updateFormula22Fields(selectedScenario);
    
    // Calculate and display the result
    calculateFormula22Result();
}

// Calculate result for Formula 22
function calculateFormula22Result() {
    const scenarioSelect = document.getElementById('scenario');
    const selectedScenario = scenarioSelect.value;
    
    const formula22Output = document.getElementById('formula-22-output');
    formula22Output.style.display = 'block';
    formula22Output.innerHTML = '';
    
    if (selectedScenario === 'Scenario 1: NO available capacity') {
        const marketPrice = parseFloat(document.getElementById('marketPrice').value);
        
        if (!isNaN(marketPrice)) {
            const paragraph = document.createElement('p');
            paragraph.innerHTML = `In <strong>Scenario 1 (NO available capacity)</strong>, the optimal internal transfer price is: <strong>${marketPrice.toFixed(2)}</strong>`;
            formula22Output.appendChild(paragraph);
            
            const explanation = document.createElement('p');
            explanation.textContent = 'When there is NO available capacity, the supplier should charge the external market price to internal customers.';
            formula22Output.appendChild(explanation);
        }
    } else {
        const supplierVariableCost = parseFloat(document.getElementById('supplierVariableCost').value);
        const buyerExternalPrice = parseFloat(document.getElementById('buyerExternalPrice').value);
        
        if (!isNaN(supplierVariableCost) && !isNaN(buyerExternalPrice)) {
            const paragraph = document.createElement('p');
            paragraph.innerHTML = `In <strong>Scenario 2 (HAS available capacity)</strong>, the optimal internal transfer price should be between: <strong>${supplierVariableCost.toFixed(2)}</strong> and <strong>${buyerExternalPrice.toFixed(2)}</strong>`;
            formula22Output.appendChild(paragraph);
            
            const explanation = document.createElement('p');
            explanation.textContent = 'When there IS available capacity, any price in this range creates value for the company. The lower bound represents the supplier\'s variable cost, while the upper bound is the external price the buyer would otherwise pay.';
            formula22Output.appendChild(explanation);
            
            // Add recommendation
            if (supplierVariableCost <= buyerExternalPrice) {
                const midpoint = (supplierVariableCost + buyerExternalPrice) / 2;
                const recommendation = document.createElement('p');
                recommendation.innerHTML = `<strong>Recommendation:</strong> A balanced approach would be to set the price at the midpoint: <strong>${midpoint.toFixed(2)}</strong>`;
                formula22Output.appendChild(recommendation);
            } else {
                const warning = document.createElement('p');
                warning.innerHTML = '<strong>Warning:</strong> The supplier\'s variable cost exceeds the buyer\'s external price. Internal transfer is not economically beneficial in this case.';
                formula22Output.appendChild(warning);
            }
        }
    }
}

// Handle input change for standard formulas
function handleInputChange(event) {
    const inputField = event.target;
    const varName = inputField.name;
    
    // Update currentInputs
    if (inputField.value === '') {
        currentInputs[varName] = null;
    } else {
        currentInputs[varName] = parseFloat(inputField.value);
    }
}

// Calculate result based on current inputs
function calculateResult() {
    // Don't calculate for Formula 22 (special case)
    if (currentFormula && currentFormula.id === 22) {
        return;
    }
    
    // Clear error message
    errorMessageArea.classList.add('hidden');
    
    // Find empty field (the one to calculate)
    let emptyFieldCount = 0;
    let fieldToCalculate = null;
    
    currentFormula.variables.forEach(variable => {
        const input = document.getElementById(variable.name);
        
        if (input.value === '') {
            emptyFieldCount++;
            fieldToCalculate = variable.name;
        }
    });
    
    // Check if we have exactly one empty field
    if (emptyFieldCount !== 1) {
        // If all fields are filled, don't show an error - just don't calculate
        if (emptyFieldCount === 0) {
            resultArea.classList.add('hidden');
            return;
        }
        
        // If multiple fields are empty, show error
        errorMessageArea.textContent = 'Please fill in all but one field to calculate.';
        errorMessageArea.classList.remove('hidden');
        resultArea.classList.add('hidden');
        return;
    }
    
    // Calculate the result
    try {
        const result = currentFormula.calculate(currentInputs);
        
        // Check if we got a result
        if (Object.keys(result).length === 0) {
            errorMessageArea.textContent = 'Could not calculate with the given inputs. Please check your values.';
            errorMessageArea.classList.remove('hidden');
            resultArea.classList.add('hidden');
            return;
        }
        
        // Display the result
        const calculatedField = document.getElementById(fieldToCalculate);
        const calculatedValue = result[fieldToCalculate];
        
        // Format the output based on variable type
        let formattedValue;
        
        // Check if the variable name suggests it's a percentage
        if (fieldToCalculate.toLowerCase().includes('margin') || 
            fieldToCalculate.toLowerCase().includes('roic') || 
            fieldToCalculate.toLowerCase().includes('coic') || 
            fieldToCalculate.toLowerCase().includes('change') ||
            fieldToCalculate.toLowerCase().includes('increase')) {
            formattedValue = calculatedValue.toFixed(2) + '%';
        } else {
            formattedValue = calculatedValue.toFixed(2);
        }
        
        // Update the input field
        calculatedField.value = calculatedValue;
        
        // Display in result area
        resultArea.textContent = `${calculatedField.labels[0].textContent}: ${formattedValue}`;
        resultArea.classList.remove('hidden');
        
        // Highlight the calculated field
        highlightCalculatedField(calculatedField);
        
    } catch (error) {
        errorMessageArea.textContent = 'Calculation error: ' + error.message;
        errorMessageArea.classList.remove('hidden');
        resultArea.classList.add('hidden');
    }
}

// Highlight the calculated field
function highlightCalculatedField(field) {
    // Remove highlights from all fields
    const allInputs = calculatorForm.querySelectorAll('input[type="number"]');
    allInputs.forEach(input => {
        input.classList.remove('is-error-highlight');
    });
    
    // Add highlighting to the calculated field
    field.classList.add('is-calculated');
}

// Clear all input fields
function clearInputFields() {
    // Reset form fields
    const allInputs = calculatorForm.querySelectorAll('input, select');
    allInputs.forEach(input => {
        if (input.type === 'number' || input.type === 'text') {
            input.value = '';
        } else if (input.type === 'select-one') {
            input.selectedIndex = 0;
        }
        
        // Remove highlighting
        input.classList.remove('is-error-highlight');
    });
    
    // Reset calculated fields
    const calculatedFields = calculatorForm.querySelectorAll('.is-calculated');
    calculatedFields.forEach(field => {
        field.value = '';
    });
    
    // Hide result and error areas
    resultArea.classList.add('hidden');
    errorMessageArea.classList.add('hidden');
    
    // Hide Formula 22 output area
    if (formula22Output) {
        formula22Output.style.display = 'none';
    }
    
    // Reset current inputs
    currentInputs = {};
    
    // If Formula 22 is selected, update its fields
    if (currentFormula && currentFormula.id === 22) {
        updateFormula22Fields(document.getElementById('scenario').value);
    }
}