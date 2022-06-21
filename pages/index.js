import Head from 'next/head'
import React from 'react';
import styles from '../styles/Home.module.css'
import AWS from 'aws-sdk'

export async function getServerSideProps(context) {
  const SESConfig = {
    credentials: {
      accessKeyId: "AKIA6RBN6FIKD4COMV6U",
      secretAccessKey: "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",
    },
    apiVersion: "latest",
    accessKeyId: "AKIA6RBN6FIKD4COMV6U",
    accessSecretKey: "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",
    region: "ap-southeast-1",
  }
  AWS.config.update(SESConfig);
  var quicksight = new AWS.QuickSight();
  var params = {
    AwsAccountId: '998676245012', /* required */
    DashboardId: 'b027fe43-9cd1-46e7-a3a0-42522fa57931', /* required */
    IdentityType: 'IAM', /* required */
    AdditionalDashboardIds: [

    ],
    Namespace: 'default',
    ResetDisabled: false,
    SessionLifetimeInMinutes: '30',
    StatePersistenceEnabled: false,
    UndoRedoDisabled: false,

  };
  return new Promise((resole, reject) => {
    quicksight.getDashboardEmbedUrl(params, function (err, data) {
      // if (err) console.log(err, err.stack); // an error occurred
      // else console.log(data);           // successful response
      return resole({
        props: { Test: data.EmbedUrl }, // will be passed to the page component as props
      })
    });
  })
}
export default function Home(props) {

  // const [url, setUrl] = useState('')
  // useEffect(() => {

  //   setUrl(props.Test)
  // }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* <h1 className={styles.title}>
          {props.Test}
        </h1> */}
        {props.Test != '' &&
          <iframe width={900} height={900} src={props.Test} title="W3Schools Free Online Web Tutorials"></iframe>
        }
      </main>

    </div>
  )
}
