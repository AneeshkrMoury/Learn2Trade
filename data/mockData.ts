import { TutorialModule, Quiz, Stock, MarketDepth } from '../types';

export const tutorialModules: TutorialModule[] = [
  // Module 1: The Basics - Understanding the Foundations
  {
    id: '1',
    titleKey: "tutorial_1_title",
    descriptionKey: "tutorial_1_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_1_exp_1", "tutorial_1_exp_2"] },
      { type: 'analogy', textKeys: ["tutorial_1_ana_1", "tutorial_1_ana_2"] },
      { type: 'takeaways', itemKeys: ["tutorial_1_tak_1", "tutorial_1_tak_2", "tutorial_1_tak_3"] }
    ]
  },
  {
    id: '2',
    titleKey: "tutorial_2_title",
    descriptionKey: "tutorial_2_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_2_exp_1", "tutorial_2_exp_2"] },
      { type: 'analogy', textKeys: ["tutorial_2_ana_1", "tutorial_2_ana_2"] },
      { type: 'takeaways', itemKeys: ["tutorial_2_tak_1", "tutorial_2_tak_2", "tutorial_2_tak_3"] }
    ]
  },
  {
    id: '3',
    titleKey: "tutorial_3_title",
    descriptionKey: "tutorial_3_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_3_exp_1", "tutorial_3_exp_2"] },
      { type: 'analogy', textKeys: ["tutorial_3_ana_1", "tutorial_3_ana_2"] },
      { type: 'takeaways', itemKeys: ["tutorial_3_tak_1", "tutorial_3_tak_2", "tutorial_3_tak_3"] }
    ]
  },
  {
    id: '4',
    titleKey: "tutorial_4_title",
    descriptionKey: "tutorial_4_desc",
    content: [
        { type: 'explanation', textKeys: ["tutorial_4_exp_1", "tutorial_4_exp_2"] },
        { type: 'analogy', textKeys: ["tutorial_4_ana_1", "tutorial_4_ana_2"] },
        { type: 'takeaways', itemKeys: ["tutorial_4_tak_1", "tutorial_4_tak_2", "tutorial_4_tak_3"] }
    ]
  },
  {
      id: '5',
      titleKey: "tutorial_5_title",
      descriptionKey: "tutorial_5_desc",
      content: [
          { type: 'explanation', textKeys: ["tutorial_5_exp_1", "tutorial_5_exp_2"] },
          { type: 'diagram', data: {
              titleKey: 'diagram_market_flow_title',
              lanes: [
                  { titleKey: 'diagram_primary_market_title', steps: [ { from: 'Company', to: 'Investors', itemKey: 'diagram_shares_first_time' }, { from: 'Investors', to: 'Company', itemKey: 'diagram_money_capital' } ] },
                  { titleKey: 'diagram_secondary_market_title', steps: [ { from: 'Investor A', to: 'Investor B', itemKey: 'diagram_shares' }, { from: 'Investor B', to: 'Investor A', itemKey: 'diagram_money' } ] }
              ]
          }},
          { type: 'analogy', textKeys: ["tutorial_5_ana_1", "tutorial_5_ana_2"] },
          { type: 'takeaways', itemKeys: ["tutorial_5_tak_1", "tutorial_5_tak_2", "tutorial_5_tak_3"] }
      ]
  },
  {
      id: '6',
      titleKey: "tutorial_6_title",
      descriptionKey: "tutorial_6_desc",
      content: [
          { type: 'explanation', textKeys: ["tutorial_6_exp_1", "tutorial_6_exp_2"] },
          { type: 'analogy', textKeys: ["tutorial_6_ana_1", "tutorial_6_ana_2"] },
          { type: 'takeaways', itemKeys: ["tutorial_6_tak_1", "tutorial_6_tak_2", "tutorial_6_tak_3"] }
      ]
  },
  {
      id: '7',
      titleKey: "tutorial_7_title",
      descriptionKey: "tutorial_7_desc",
      content: [
          { type: 'explanation', textKeys: ["tutorial_7_exp_1", "tutorial_7_exp_2"] },
          { type: 'analogy', textKeys: ["tutorial_7_ana_1", "tutorial_7_ana_2", "tutorial_7_ana_3"] },
          { type: 'takeaways', itemKeys: ["tutorial_7_tak_1", "tutorial_7_tak_2", "tutorial_7_tak_3"] }
      ]
  },
  {
      id: '8',
      titleKey: "tutorial_8_title",
      descriptionKey: "tutorial_8_desc",
      content: [
          { type: 'explanation', textKeys: ["tutorial_8_exp_1", "tutorial_8_exp_2"] },
          { type: 'analogy', textKeys: ["tutorial_8_ana_1", "tutorial_8_ana_2"] },
          { type: 'takeaways', itemKeys: ["tutorial_8_tak_1", "tutorial_8_tak_2", "tutorial_8_tak_3"] }
      ]
  },
  {
      id: '9',
      titleKey: "tutorial_9_title",
      descriptionKey: "tutorial_9_desc",
      content: [
          { type: 'explanation', textKeys: ["tutorial_9_exp_1", "tutorial_9_exp_2"] },
          { type: 'analogy', textKeys: ["tutorial_9_ana_1", "tutorial_9_ana_2"] },
          { type: 'takeaways', itemKeys: ["tutorial_9_tak_1", "tutorial_9_tak_2", "tutorial_9_tak_3"] }
      ]
  },
  {
    id: '10',
    titleKey: "tutorial_10_title",
    descriptionKey: "tutorial_10_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_10_exp_1", "tutorial_10_exp_2"] },
      { type: 'analogy', textKeys: ["tutorial_10_ana_1", "tutorial_10_ana_2"] },
      { type: 'takeaways', itemKeys: ["tutorial_10_tak_1", "tutorial_10_tak_2", "tutorial_10_tak_3"] }
    ]
  },
  {
    id: '11',
    titleKey: "tutorial_11_title",
    descriptionKey: "tutorial_11_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_11_exp_1", "tutorial_11_exp_2"] },
      { type: 'analogy', textKeys: ["tutorial_11_ana_1", "tutorial_11_ana_2"] },
      { type: 'takeaways', itemKeys: ["tutorial_11_tak_1", "tutorial_11_tak_2", "tutorial_11_tak_3"] }
    ]
  },
  {
    id: '12',
    titleKey: "tutorial_12_title",
    descriptionKey: "tutorial_12_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_12_exp_1", "tutorial_12_exp_2"] },
      { type: 'analogy', textKeys: ["tutorial_12_ana_1", "tutorial_12_ana_2"] },
      { type: 'takeaways', itemKeys: ["tutorial_12_tak_1", "tutorial_12_tak_2", "tutorial_12_tak_3"] }
    ]
  },
  {
    id: '13',
    titleKey: "tutorial_13_title",
    descriptionKey: "tutorial_13_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_13_exp_1", "tutorial_13_exp_2"] },
      { type: 'analogy', textKeys: ["tutorial_13_ana_1", "tutorial_13_ana_2"] },
      { type: 'takeaways', itemKeys: ["tutorial_13_tak_1", "tutorial_13_tak_2", "tutorial_13_tak_3"] }
    ]
  },
  {
    id: '14',
    titleKey: "tutorial_14_title",
    descriptionKey: "tutorial_14_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_14_exp_1", "tutorial_14_exp_2"] },
      { type: 'analogy', textKeys: ["tutorial_14_ana_1", "tutorial_14_ana_2"] },
      { type: 'takeaways', itemKeys: ["tutorial_14_tak_1", "tutorial_14_tak_2", "tutorial_14_tak_3"] }
    ]
  },
  {
    id: '15',
    titleKey: "tutorial_15_title",
    descriptionKey: "tutorial_15_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_15_exp_1", "tutorial_15_exp_2"] },
      { type: 'analogy', textKeys: ["tutorial_15_ana_1", "tutorial_15_ana_2"] },
      { type: 'takeaways', itemKeys: ["tutorial_15_tak_1", "tutorial_15_tak_2", "tutorial_15_tak_3"] }
    ]
  },
  {
    id: '16',
    titleKey: "tutorial_16_title",
    descriptionKey: "tutorial_16_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_16_exp_1", "tutorial_16_exp_2"] },
      { type: 'analogy', textKeys: ["tutorial_16_ana_1", "tutorial_16_ana_2"] },
      { type: 'takeaways', itemKeys: ["tutorial_16_tak_1", "tutorial_16_tak_2", "tutorial_16_tak_3"] }
    ]
  },
  {
    id: '17',
    titleKey: "tutorial_17_title",
    descriptionKey: "tutorial_17_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_17_exp_1", "tutorial_17_exp_2"] },
      { type: 'analogy', textKeys: ["tutorial_17_ana_1", "tutorial_17_ana_2"] },
      { type: 'takeaways', itemKeys: ["tutorial_17_tak_1", "tutorial_17_tak_2", "tutorial_17_tak_3"] }
    ]
  },
  {
    id: '18',
    titleKey: "tutorial_18_title",
    descriptionKey: "tutorial_18_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_18_exp_1", "tutorial_18_exp_2"] },
      { type: 'analogy', textKeys: ["tutorial_18_ana_1", "tutorial_18_ana_2"] },
      { type: 'takeaways', itemKeys: ["tutorial_18_tak_1", "tutorial_18_tak_2", "tutorial_18_tak_3"] }
    ]
  },
  {
    id: '19',
    titleKey: "tutorial_19_title",
    descriptionKey: "tutorial_19_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_19_exp_1", "tutorial_19_exp_2"] },
      { type: 'analogy', textKeys: ["tutorial_19_ana_1", "tutorial_19_ana_2"] },
      { type: 'takeaways', itemKeys: ["tutorial_19_tak_1", "tutorial_19_tak_2", "tutorial_19_tak_3"] }
    ]
  },
  {
    id: '20',
    titleKey: "tutorial_20_title",
    descriptionKey: "tutorial_20_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_20_exp_1", "tutorial_20_exp_2", "tutorial_20_exp_3", "tutorial_20_exp_4", "tutorial_20_exp_5"] },
      { type: 'barChart',
        data: [
          { nameKey: 'chart_small_cap', value: 1, labelKey: 'chart_small_cap_label' },
          { nameKey: 'chart_mid_cap', value: 2, labelKey: 'chart_mid_cap_label' },
          { nameKey: 'chart_large_cap', value: 3, labelKey: 'chart_large_cap_label' },
        ],
        colors: ['#f59e0b', '#0ea5e9', '#10b981']
      },
      { type: 'analogy', textKeys: ["tutorial_20_ana_1", "tutorial_20_ana_2", "tutorial_20_ana_3", "tutorial_20_ana_4"] },
      { type: 'takeaways', itemKeys: ["tutorial_20_tak_1", "tutorial_20_tak_2", "tutorial_20_tak_3"] }
    ]
  },
  {
    id: '21',
    titleKey: "tutorial_21_title",
    descriptionKey: "tutorial_21_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_21_exp_1", "tutorial_21_exp_2"] },
      { type: 'analogy', textKeys: ["tutorial_21_ana_1", "tutorial_21_ana_2", "tutorial_21_ana_3"] },
      { type: 'takeaways', itemKeys: ["tutorial_21_tak_1", "tutorial_21_tak_2", "tutorial_21_tak_3"] }
    ]
  },
  {
    id: '22',
    titleKey: "tutorial_22_title",
    descriptionKey: "tutorial_22_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_22_exp_1", "tutorial_22_exp_2"] },
      { type: 'analogy', textKeys: ["tutorial_22_ana_1", "tutorial_22_ana_2", "tutorial_22_ana_3"] },
      { type: 'takeaways', itemKeys: ["tutorial_22_tak_1", "tutorial_22_tak_2", "tutorial_22_tak_3"] }
    ]
  },
  {
    id: '23',
    titleKey: "tutorial_23_title",
    descriptionKey: "tutorial_23_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_23_exp_1", "tutorial_23_exp_2"] },
      { type: 'analogy', textKeys: ["tutorial_23_ana_1", "tutorial_23_ana_2"] },
      { type: 'takeaways', itemKeys: ["tutorial_23_tak_1", "tutorial_23_tak_2", "tutorial_23_tak_3"] }
    ]
  },
  {
    id: '24',
    titleKey: "tutorial_24_title",
    descriptionKey: "tutorial_24_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_24_exp_1", "tutorial_24_exp_2"] },
      { type: 'analogy', textKeys: ["tutorial_24_ana_1", "tutorial_24_ana_2"] },
      { type: 'takeaways', itemKeys: ["tutorial_24_tak_1", "tutorial_24_tak_2", "tutorial_24_tak_3"] }
    ]
  },
  {
    id: '25',
    titleKey: "tutorial_25_title",
    descriptionKey: "tutorial_25_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_25_exp_1", "tutorial_25_exp_2"] },
      { type: 'pieChart',
        data: [
          { nameKey: 'chart_tech_stocks', value: 30 },
          { nameKey: 'chart_bank_stocks', value: 25 },
          { nameKey: 'chart_pharma_stocks', value: 20 },
          { nameKey: 'chart_bonds', value: 15 },
          { nameKey: 'chart_gold', value: 10 }
        ],
        colors: ['#38bdf8', '#34d399', '#f472b6', '#a78bfa', '#fde047']
      },
      { type: 'analogy', textKeys: ["tutorial_25_ana_1", "tutorial_25_ana_2"] },
      { type: 'takeaways', itemKeys: ["tutorial_25_tak_1", "tutorial_25_tak_2", "tutorial_25_tak_3"] }
    ]
  },
  {
    id: '26',
    titleKey: "tutorial_26_title",
    descriptionKey: "tutorial_26_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_26_exp_1", "tutorial_26_exp_2", "tutorial_26_exp_3", "tutorial_26_exp_4"]},
      { type: 'analogy', textKeys: ["tutorial_26_ana_1", "tutorial_26_ana_2"] },
      { type: 'takeaways', itemKeys: ["tutorial_26_tak_1", "tutorial_26_tak_2", "tutorial_26_tak_3"] }
    ]
  },
  {
    id: '27',
    titleKey: "tutorial_27_title",
    descriptionKey: "tutorial_27_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_27_exp_1", "tutorial_27_exp_2"] },
      { type: 'analogy', textKeys: ["tutorial_27_ana_1", "tutorial_27_ana_2"] },
      { type: 'takeaways', itemKeys: ["tutorial_27_tak_1", "tutorial_27_tak_2", "tutorial_27_tak_3"] }
    ]
  },
  {
    id: '28',
    titleKey: "tutorial_28_title",
    descriptionKey: "tutorial_28_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_28_exp_1", "tutorial_28_exp_2"] },
      { type: 'analogy', textKeys: ["tutorial_28_ana_1", "tutorial_28_ana_2"] },
      { type: 'takeaways', itemKeys: ["tutorial_28_tak_1", "tutorial_28_tak_2", "tutorial_28_tak_3"] }
    ]
  },
  {
    id: '29',
    titleKey: "tutorial_29_title",
    descriptionKey: "tutorial_29_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_29_exp_1", "tutorial_29_exp_2"] },
      { type: 'analogy', textKeys: ["tutorial_29_ana_1", "tutorial_29_ana_2"] },
      { type: 'header', textKey: 'table_index_comparison_header' },
      { type: 'table', data: {
          headerKeys: ['table_feature_header', 'Sensex', 'Nifty 50', 'Dow Jones'],
          rows: [
            ['table_country_header', 'table_india_value', 'table_india_value', 'table_usa_value'],
            ['table_exchange_header', 'BSE', 'NSE', 'table_nyse_nasdaq_value'],
            ['table_companies_header', '30', '50', '30'],
            ['table_constituents_header', 'table_sensex_const_value', 'table_nifty_const_value', 'table_dow_const_value']
          ]
      }},
      { type: 'takeaways', itemKeys: ["tutorial_29_tak_1", "tutorial_29_tak_2", "tutorial_29_tak_3"] }
    ]
  },
  {
    id: '30',
    titleKey: "tutorial_30_title",
    descriptionKey: "tutorial_30_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_30_exp_1", "tutorial_30_exp_2"] },
      { type: 'analogy', textKeys: ["tutorial_30_ana_1", "tutorial_30_ana_2"] },
      { type: 'takeaways', itemKeys: ["tutorial_30_tak_1", "tutorial_30_tak_2", "tutorial_30_tak_3"] }
    ]
  },
  {
    id: '31',
    titleKey: "tutorial_31_title",
    descriptionKey: "tutorial_31_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_31_exp_1", "tutorial_31_exp_2"] },
      { type: 'analogy', textKeys: ["tutorial_31_ana_1", "tutorial_31_ana_2"] },
      { type: 'takeaways', itemKeys: ["tutorial_31_tak_1", "tutorial_31_tak_2", "tutorial_31_tak_3"] }
    ]
  },
  {
    id: '32',
    titleKey: "tutorial_32_title",
    descriptionKey: "tutorial_32_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_32_exp_1", "tutorial_32_exp_2"] },
      { type: 'analogy', textKeys: ["tutorial_32_ana_1", "tutorial_32_ana_2"] },
      { type: 'takeaways', itemKeys: ["tutorial_32_tak_1", "tutorial_32_tak_2", "tutorial_32_tak_3"] }
    ]
  },
  {
    id: '33',
    titleKey: "tutorial_33_title",
    descriptionKey: "tutorial_33_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_33_exp_1", "tutorial_33_exp_2"] },
      { type: 'analogy', textKeys: ["tutorial_33_ana_1", "tutorial_33_ana_2"] },
      { type: 'takeaways', itemKeys: ["tutorial_33_tak_1", "tutorial_33_tak_2", "tutorial_33_tak_3"] }
    ]
  },
  {
    id: '34',
    titleKey: "tutorial_34_title",
    descriptionKey: "tutorial_34_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_34_exp_1", "tutorial_34_exp_2", "tutorial_34_exp_3", "tutorial_34_exp_4"]},
      { type: 'analogy', textKeys: ["tutorial_34_ana_1"] },
      { type: 'takeaways', itemKeys: ["tutorial_34_tak_1", "tutorial_34_tak_2", "tutorial_34_tak_3"] }
    ]
  },
  {
    id: '35',
    titleKey: "tutorial_35_title",
    descriptionKey: "tutorial_35_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_35_exp_1", "tutorial_35_exp_2"] },
      { type: 'analogy', textKeys: ["tutorial_35_ana_1", "tutorial_35_ana_2"] },
      { type: 'takeaways', itemKeys: ["tutorial_35_tak_1", "tutorial_35_tak_2", "tutorial_35_tak_3"] }
    ]
  },
  {
    id: '36',
    titleKey: "tutorial_36_title",
    descriptionKey: "tutorial_36_desc",
    content: [
      { type: 'explanation', textKeys: ["tutorial_36_exp_1", "tutorial_36_exp_2"] },
      { type: 'analogy', textKeys: ["tutorial_36_ana_1", "tutorial_36_ana_2"] },
      { type: 'takeaways', itemKeys: ["tutorial_36_tak_1", "tutorial_36_tak_2", "tutorial_36_tak_3"] }
    ]
  }
];


export const quizzes: Quiz[] = [
  {
    id: 'daily1',
    titleKey: 'quiz_1_title',
    questions: [
      {
        questionKey: 'quiz_1_q1',
        optionKeys: ['quiz_1_q1_op1', 'quiz_1_q1_op2', 'quiz_1_q1_op3', 'quiz_1_q1_op4'],
        correctAnswerKey: 'quiz_1_q1_op2',
      },
      {
        questionKey: 'quiz_1_q2',
        optionKeys: ['quiz_1_q2_op1', 'quiz_1_q2_op2', 'quiz_1_q2_op3', 'quiz_1_q2_op4'],
        correctAnswerKey: 'quiz_1_q2_op3',
      },
      {
        questionKey: 'quiz_1_q3',
        optionKeys: ['quiz_1_q3_op1', 'quiz_1_q3_op2', 'quiz_1_q3_op3', 'quiz_1_q3_op4'],
        correctAnswerKey: 'quiz_1_q3_op2',
      },
      {
        questionKey: 'quiz_1_q4',
        optionKeys: ['quiz_1_q4_op1', 'quiz_1_q4_op2', 'quiz_1_q4_op3', 'quiz_1_q4_op4'],
        correctAnswerKey: 'quiz_1_q4_op3',
      },
      {
        questionKey: 'quiz_1_q5',
        optionKeys: ['quiz_1_q5_op1', 'quiz_1_q5_op2', 'quiz_1_q5_op3', 'quiz_1_q5_op4'],
        correctAnswerKey: 'quiz_1_q5_op2',
      },
    ],
  },
];

const generatePriceHistory = (initialPrice: number, days: number) => {
  const history = [];
  let currentPrice = initialPrice;
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    history.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(currentPrice.toFixed(2)),
    });
    // More realistic fluctuation for Indian stocks
    currentPrice += (Math.random() - 0.5) * (initialPrice * 0.02);
    if (currentPrice < (initialPrice * 0.5) ) currentPrice = initialPrice * 0.5; // Prevent dropping too low
  }
  return history;
};

export const generateMarketDepth = (price: number): MarketDepth => {
    const bids = [];
    const asks = [];
    let bidPrice = price * 0.998;
    let askPrice = price * 1.002;
    for (let i = 0; i < 5; i++) {
        bids.push({ price: parseFloat(bidPrice.toFixed(2)), quantity: Math.floor(Math.random() * 500) + 50 });
        asks.push({ price: parseFloat(askPrice.toFixed(2)), quantity: Math.floor(Math.random() * 500) + 50 });
        bidPrice -= (Math.random() * (price * 0.0005));
        askPrice += (Math.random() * (price * 0.0005));
    }
    return { bids, asks };
}


const reliance_close = 2850.30;
const tcs_close = 3800.50;
const hdfc_close = 1520.75;

export const mockStocks: Stock[] = [
  {
    ticker: 'RELIANCE',
    name: 'Reliance Industries Ltd.',
    price: reliance_close,
    history: generatePriceHistory(reliance_close, 30),
    close: reliance_close,
    open: reliance_close * (1 + (Math.random() - 0.5) * 0.01),
    high: reliance_close * 1.02,
    low: reliance_close * 0.98,
    volume: Math.floor(Math.random() * 5000000) + 2000000,
    marketDepth: generateMarketDepth(reliance_close),
  },
  {
    ticker: 'TCS',
    name: 'Tata Consultancy Services',
    price: tcs_close,
    history: generatePriceHistory(tcs_close, 30),
    close: tcs_close,
    open: tcs_close * (1 + (Math.random() - 0.5) * 0.01),
    high: tcs_close * 1.015,
    low: tcs_close * 0.985,
    volume: Math.floor(Math.random() * 3000000) + 1000000,
    marketDepth: generateMarketDepth(tcs_close),
  },
  {
    ticker: 'HDFCBANK',
    name: 'HDFC Bank Ltd.',
    price: hdfc_close,
    history: generatePriceHistory(hdfc_close, 30),
    close: hdfc_close,
    open: hdfc_close * (1 + (Math.random() - 0.5) * 0.01),
    high: hdfc_close * 1.025,
    low: hdfc_close * 0.975,
    volume: Math.floor(Math.random() * 10000000) + 5000000,
    marketDepth: generateMarketDepth(hdfc_close),
  },
];