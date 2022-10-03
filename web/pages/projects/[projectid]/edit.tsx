import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Notificate } from "../../../common/types";
import ProjectForm from "../../../components/Projects/ProjectForm";

const EditProjectPage: NextPage<Notificate> = ({ notificate }) => {
  const router = useRouter();
  const projectid = router.query.projectid;
  const project_name = router.query.project_name;

  if (projectid == undefined) return <div>Project not found</div>;

  return (
    <>
      <Head>
        <title>BoschView | Project Edit</title>
        <meta name="description" content="" />
        <link
          rel="icon"
          href="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoiYm9zY2hcL2FjY291bnRzXC9hNVwvNDAwMDA5OFwvZmF2aWNvbnNcL2M0XC8xXC80OTE5YmU5YTQ0MWFhNTdlZWY0ZWNjODJjNTNmYTY1Zi0xNTgyODAyMzk2LnBuZyJ9:bosch:IDFHfQ1b9xJR_hcNEngAKJ1pHo2gl9MFWBp2Bn45nFk?width={width}&rect=0,0,32,32&reference_width=32"
        />
      </Head>
      <ProjectForm project_id={projectid.toString()} notificate={notificate} />
    </>
  );
};

export default EditProjectPage;
