import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "participant",
    college: "",
    teamName: "",
    members: [{ name: "", email: "" }],
  });

  const [signupSuccess, setSignupSuccess] = useState(false);
  const [teamID, setTeamID] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMemberChange = (index, e) => {
    const newMembers = [...formData.members];
    newMembers[index][e.target.name] = e.target.value;
    setFormData({ ...formData, members: newMembers });
  };

  const addMember = () => {
    setFormData({
      ...formData,
      members: [...formData.members, { name: "", email: "" }],
    });
  };

  const removeMember = (index) => {
    const newMembers = formData.members.filter((_, i) => i !== index);
    setFormData({ ...formData, members: newMembers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    if (formData.role === "participant") {
      payload.college = formData.college;
      payload.teamName = formData.teamName;
      payload.members = formData.members.filter(
        (m) => m.name && m.email
      );
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/signup",
        payload
      );

      // If backend sends teamID (for participant), save it
      if (res.data.user && res.data.user.teamID) {
        setTeamID(res.data.user.teamID);
      } else {
        setTeamID(null);
      }

      setSignupSuccess(true);
      setErrorMsg(null);
      // You can comment this out or keep for manual navigation after testing:
      // navigate("/login");

    } catch (err) {
      setSignupSuccess(false);
      setErrorMsg(err.response?.data?.error || err.message);
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border shadow rounded">
      <h2 className="text-xl font-bold mb-4">Signup</h2>

      {signupSuccess ? (
        <div className="p-4 bg-green-100 text-green-700 rounded">
          Signup successful!
          {teamID && (
            <p>
              Your generated Team ID: <strong>{teamID}</strong>
            </p>
          )}
          <button
            onClick={() => navigate("/login")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Go to Login
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border"
          >
            <option value="participant">Participant</option>
            <option value="judge">Judge</option>
            <option value="admin">Admin</option>
          </select>

          {formData.role === "participant" && (
            <>
              <input
                type="text"
                name="college"
                placeholder="College"
                required
                value={formData.college}
                onChange={handleChange}
                className="w-full p-2 border"
              />
              <input
                type="text"
                name="teamName"
                placeholder="Team Name"
                required
                value={formData.teamName}
                onChange={handleChange}
                className="w-full p-2 border"
              />
              <div>
                <p className="font-semibold mb-1">Team Members:</p>
                {formData.members.map((member, idx) => (
                  <div key={idx} className="mb-2 flex gap-2">
                    <input
                      type="text"
                      name="name"
                      placeholder="Member Name"
                      required
                      value={member.name}
                      onChange={(e) => handleMemberChange(idx, e)}
                      className="flex-1 p-2 border"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Member Email"
                      required
                      value={member.email}
                      onChange={(e) => handleMemberChange(idx, e)}
                      className="flex-1 p-2 border"
                    />
                    {formData.members.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMember(idx)}
                        className="bg-red-500 text-white px-2 rounded"
                      >
                        X
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addMember}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Add Member
                </button>
              </div>
            </>
          )}

          {errorMsg && (
            <p className="text-red-600 font-semibold">{errorMsg}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
};

export default SignupPage;
