import axios from "axios";

export interface userType {
  address: {
    street: string;
    suite: string;
    zipcode: string;
    city: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}
interface responseUserType {
  loading: boolean;
  data: userType[];
  error: string;
}

export function useCrudUser() {
  const getUserList = async (url: string): Promise<responseUserType> => {
    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        return {
          loading: false,
          data: res.data,
          error: "",
        };
      }
      return {
        loading: false,
        data: [],
        error: "",
      };
    } catch (err: any) {
      return {
        loading: false,
        data: [],
        error: err.message,
      };
    }
  };

  const deleteUser = async (
    url: string,
    index: number,
    row: userType
  ): Promise<boolean> => {
    try {
      const res = await axios.delete(`${url}/${row.id}`);
      if (res.status === 200) {
        return true;
      }
    } catch (err: any) {
      console.log(err);
      return false;
    }
    return false;
  };

  return {
    getUserList,
    deleteUser,
  };
}
