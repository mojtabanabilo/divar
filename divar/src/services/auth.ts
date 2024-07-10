import api from "../configs/api";

export const sendOtp = async (mobile: any) => {
  try {
    const response = await api.post("auth/send-otp", { mobile });
    return { response };
  } catch (error) {
    return { error };
  }
};

export const checkOtp = async (mobile: any, code: any) => {
  try {
    const response = await api.post("auth/check-otp", { mobile, code });
    return { response };
  } catch (error) {
    return { error };
  }
};
