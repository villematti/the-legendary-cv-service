import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
  <div className="w-full">
    <UserProfile path="/user-profile" />;
  </div>
);

export default UserProfilePage;
