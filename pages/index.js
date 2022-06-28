import Head from "next/head";
import style from "./index.module.css";

export async function getServerSideProps(context) {
  // Seting AWS config
  var AWS = require("aws-sdk");
  const SESConfig = {
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.ACCESS_SECRET_KEY,
    },
    apiVersion: "latest",
    accessKeyId: process.env.ACCESS_KEY_ID,
    accessSecretKey: process.env.ACCESS_SECRET_KEY,
    region: process.env.REGION,
  };
  AWS.config.update(SESConfig);

  // Setting parameters to get embed URL
  var quicksight = new AWS.QuickSight();
  var params = {
    AwsAccountId: "" + process.env.ACCOUNT_ID, // The ID of AWS account containing the dashboard
    EntryPoint: "/start", // The QuickSight URL used to access the embedded session (/start | /start/analyses | /start/dashboards | /start/favorites | /dashboards/DASHBOARD-ID | /analyses/ANALYSIS-ID)
    // IdentityType: "IAM", // The authentication method that the user uses to sign in = "IAM" | "QUICKSIGHT" | "ANONYMOUS"
    // DashboardId: process.env.DASHBOARD_ID, // The ID of the dashboard
    // AdditionalDashboardIds: [], // The list of dashboard IDs (the IdentityType parameter must be set to ANONYMOUS for this to work)
    // Namespace: "default", // The QuickSight namespace that contains the dashboard IDs
    SessionLifetimeInMinutes: "600", // How many minutes the session is valid = from "15" to "600"
    // UndoRedoDisabled: false, // Disable the undo/redo button on the embedded dashboard
    // ResetDisabled: false, // Disable the reset button on the embedded dashboard
    // StatePersistenceEnabled: true, // If this parameter is set to TRUE, the settings are the same when the user reopens the same dashboard URL
  };

  // Getting embed URL
  let callAPI = async function () {
    return new Promise((resolve, reject) => {
      // quicksight.getDashboardEmbedUrl(params, function (err, data) {
      quicksight.getSessionEmbedUrl(params, function (err, data) {
        if (err) console.log(err, err.stack);
        else {
          console.log(data);
          return resolve(data);
        }
      });
    });
  };
  let result = await callAPI();
  return { props: { test: JSON.stringify(result) } };
}

// Embed URL
export default function Home(props) {
  console.log(props);
  return (
    <div className={style.bg}>
      <Head>
        <title>QuickSight Embedding</title>
      </Head>
      <h2>QuickSight Embed URL Example</h2>
      <iframe
        className={style.frame}
        src={`${JSON.parse(props.test).EmbedUrl}`}
      ></iframe>
    </div>
  );
}
