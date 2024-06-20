// Initialize the ContractKit
const kit = ContractKit.create({
    connection: {
      url: 'https://alfajores-forno.celo-testnet.org'
    }
  });
  
  // Get the user's Celo account
  async function getAccount() {
    const accounts = await kit.web3.eth.getAccounts();
    return accounts[0];
  }
  
  // Send money to the recipient address
  async function sendMoney(recipientAddress, amount) {
    const account = await getAccount();
    const transaction = await kit.sendTransaction({
      from: account,
      to: recipientAddress,
      value: kit.web3.utils.toWei(amount.toString(), 'ether')
    });
    await transaction.waitReceipt();
    console.log('Money sent successfully!');
  }
  
  // Handle the form submission
  document.getElementById('sendMoneyForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const recipientAddress = document.getElementById('recipientAddress').value;
    const amount = document.getElementById('amount').value;
    await sendMoney(recipientAddress, amount);
    alert('Money sent successfully!');
  });