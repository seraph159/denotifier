const SparkPost = require("sparkpost");
const BASE_URL = 'https://api.hackerwebapp.com';
const types = ["news", "best", "newest"];
const page = 1;
import generateHtml from '../../templates/dTemplate'
import { getUserDocument } from '../../firebase/firebase.utils';

export default async function sendEmail(req, res) {

let auth_header = "none none"
const auth_secret = process.env.GH_API_KEY
const client = new SparkPost(process.env.SPARKPOST_API);
const auth_token = auth_header.split(" ")[1];
if(auth_token === auth_secret){
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

res.status(200).send(gHtml)
} else {
    res.statusCode = 404;
    res.send('Unauthorized')
}
}