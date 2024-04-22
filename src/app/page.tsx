"use client";
import "@aws-amplify/ui-react/styles.css";
import Auth from "@/components/auth";
import PageContainer from "@/components/pageContainer";

const Home = () => {
  return (
    <PageContainer>
      <Auth />
    </PageContainer>
  );
};

export default Home;
