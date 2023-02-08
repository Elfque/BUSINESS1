const inventName = document.querySelector(".invent_name");
const inventAmount = document.querySelector(".invent_amo");
const inventAddBtn = document.querySelector(".add_invent");
const mainInvest = document.querySelector(".main_invest");
const totalSpan = document.querySelector(".total");

// INVENT PART
let inventory = localStorage.getItem("invent")
  ? JSON.parse(localStorage.getItem("invent"))
  : [];

let myPurchases = localStorage.getItem("purchase")
  ? JSON.parse(localStorage.getItem("purchase"))
  : [];

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-NG").format(date);
};

const getTotalInvent = () => {
  const totalInvent = inventory.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );
  totalSpan.textContent = totalInvent;
};

const data = [
  { name: "11", amount: "11", date: "2023-01-24T09:12:28.476Z" },
  { name: "11", amount: "11", date: "2023-01-24T09:12:29.982Z" },
  { name: "11", amount: "11", date: "2023-01-24T09:13:00.095Z" },
  { name: "11", amount: "11", date: "2023-01-24T09:13:57.240Z" },
  { name: "11", amount: "11", date: "2023-01-24T09:16:19.077Z" },
];

const inputDetails = (data, dest) => {
  dest.textContent = "";
  data.forEach((invest) => {
    const dat = ` <div class="invent grid grid-cols-4 font-semibold">
          <div class="invent_name truncate w-[90%]">${invest.name}</div>
          <div class="invent_amount ">${invest.amount}</div>
           <div className="date">${formatDate(new Date(invest.date))}</div>
          </div>`;

    dest.insertAdjacentHTML("beforeend", dat);
  });
};

inputDetails(inventory, mainInvest);
getTotalInvent();

inventAddBtn.addEventListener("click", () => {
  const iName = inventName.value;
  const iAmount = Number(inventAmount.value);
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

  inputDetails(inventory, mainInvest);

  inventName.value = "";
  inventAmount.value = "";
});

// PURCHASES PART
const purchaseName = document.querySelector(".purchase_name");
const purchaseAmount = document.querySelector(".purchase_amo");
const purchaseAddBtn = document.querySelector(".add_purchase");
const mainPurchase = document.querySelector(".main_purchase");
// const totalSpan = document.querySelector(".total");

inputDetails(myPurchases, mainPurchase);

purchaseAddBtn.addEventListener("click", () => {
  const pName = purchaseName.value;
  const pAmount = Number(purchaseAmount.value);

  if (!pAmount || !pName) {
    alert("input cannot be empty");
    return;
  }

  const newPurchases = [
    ...myPurchases,
    {
      name: pName,
      amount: pAmount,
      date: new Date().toISOString(),
    },
  ];

  myPurchases = newPurchases;
  localStorage.setItem("purchase", JSON.stringify(newPurchases));

  inputDetails(newPurchases, mainPurchase);

  purchaseName.value = "";
  purchaseAmount.value = "";
});
