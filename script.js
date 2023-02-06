const inventName = document.querySelector(".invent_name");
const inventAmount = document.querySelector(".invent_amo");
const inventAddBtn = document.querySelector(".add_invent");
const mainInvest = document.querySelector(".main_invest");

let inventory = localStorage.getItem("invent")
  ? JSON.parse(localStorage.getItem("invent"))
  : [];

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-NG").format(date);
};

const data = [
  { name: "11", amount: "11", date: "2023-01-24T09:12:28.476Z" },
  { name: "11", amount: "11", date: "2023-01-24T09:12:29.982Z" },
  { name: "11", amount: "11", date: "2023-01-24T09:13:00.095Z" },
  { name: "11", amount: "11", date: "2023-01-24T09:13:57.240Z" },
  { name: "11", amount: "11", date: "2023-01-24T09:16:19.077Z" },
];

const inputInvest = (data) => {
  mainInvest.textContent = "";
  data.forEach((invest) => {
    const dat = ` <div class="invent grid grid-cols-4 font-semibold">
          <div class="invent_name">${invest.name}</div>
          <div class="invent_amount truncate">${invest.amount}</div>
           <div className="date">${formatDate(new Date(invest.date))}</div>
          </div>`;

    mainInvest.insertAdjacentHTML("beforeend", dat);
  });
};

inputInvest(inventory);

inventAddBtn.addEventListener("click", () => {
  const iName = inventName.value;
  const iAmount = inventAmount.value;
  if (!iAmount || !iName) {
    alert("input cannot be empty");
    return;
  }

  const investDate = new Date();

  const newInventory = [
    ...inventory,
    {
      name: iName,
      amount: iAmount,
      date: new Date().toISOString(),
    },
  ];

  inventory = newInventory;
  localStorage.setItem("invent", JSON.stringify(newInventory));

  inputInvest(newInventory);
});
