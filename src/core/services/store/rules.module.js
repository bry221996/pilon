export const ADD_RULE = "addRule";

const state = {
  industries: [
    "Professional Services",
    "Health and Medical",
    "Construction",
    "Marine and Shipping",
    "Arts, Entetainment, and Recreation",
    "Training and Education",
    "Science and Techno;ogy",
    "Whalesale and Retail Trade",
    "Transport, Storage, and logistic",
    "Tuorism",
    "Manufacturing and Engineering",
    "Food and Beverage",
    "Information and Technology",
    "Marketing and Communication",
    "Apparels",
    "Oil and Gas"
  ],
  list: [
    {
      name: "Sample auto invest",
      interest_range: [4, 10],
      tenure: [8, 12],
      allocation_limit: 100000,
      industries: [0, 1, 4, 6, 7],
      status: true
    },
    {
      name: "Sample auto invest 2",
      interest_range: [1, 6],
      tenure: [1, 3],
      allocation_limit: 250000,
      industries: [0, 1, 4, 6, 7],
      status: false
    }
  ]
};

const mutations = {
  [ADD_RULE](state, rule) {
    state.list.push(rule);
  }
};

export default {
  state,
  mutations
};
