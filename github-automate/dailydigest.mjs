const SparkPost = require("sparkpost");
const BASE_URL = 'https://api.hackerwebapp.com';
const types = ["news", "best", "newest"];
const page = 1;
import  generateHtml from './dTemplate.mjs'
import { getUserDocument } from './firebase.mjs'

(async function run() {

const client = new SparkPost(process.env.SPARKPOST_API);

let userList = await getUserDocument();
let gHtml;

for(let i = 0; i < userList.length;i++){
 gHtml = await generateHtml(userList[i])
client.transmissions
.send({
    options:{
        sandbox: false,
    },
    content: {
        from:"digest@denotifier.com",
        subject:`Your Daily Digest`,
        html: gHtml
    },
    recipients:[{
        address: `${userList[i].email}`,
        name: 'deNotifier Digest'
    }]
}).then(data => {
    console.log('Woohoo! You just sent your first mailing!')
    console.log(data)
  })
  .catch(err => {
    console.log('Whoops! Something went wrong')
    console.log(err)
  })
}
})();

