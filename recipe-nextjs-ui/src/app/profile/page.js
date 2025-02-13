import ProfileClient from "@/components/home/ProfileClient";

export const metadata = {
  title: "Profile Page",
  description: "Your recipe are listed.",
};

function Profile() {
  return (
    <main>
      <ProfileClient />
    </main>
  );
}

export default Profile;
