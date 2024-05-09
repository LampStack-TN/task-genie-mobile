interface ProfileUser {
  id: number;
  fullName: string;
  email: string;
  password: string;
  role: string;
  phone: string | null;
  birthdate: string | null;
  city: string;
  address: string;
  zipcode: string;
  avatar: string;
  profile: {
    id: number;
    jobTitle: string;
    bio: string;
    userId: number;
  };
}

export default ProfileUser;
