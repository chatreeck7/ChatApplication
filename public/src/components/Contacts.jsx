import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import defaultAvatar from "../assets/default_groupchat.jpeg";
import axios from "axios";
import { changeNicknameRoute, createGroupRoute } from "../utils/APIRoutes";
import { toast } from "react-toastify";
import { IconContext } from "react-icons";
import { AiTwotoneSetting } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { BsPlus } from "react-icons/bs";

export default function Contacts({ contacts, changeChat, socket }) {
  const [currentNickname, setCurrentNickname] = useState(undefined);
  const [currentUsername, setCurrentUsername] = useState(undefined);
  const [currentUserId, setCurrentUserId] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setCurrentUsername(data.username);
      setCurrentNickname(data.nickname);
      setCurrentUserImage(data.avatarImage);
      setCurrentUserId(data._id);
    }
    fetchData();
  }, [currentNickname]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);

    if (contact.email === "") {
      console.log("currentChat", contact, "Username: ", contact.username);

      // chat with join group
      socket.current.emit("join-room", {
        room: contact.username,
        username: currentUsername,
      });

      // on the socket for roomUsers
      socket.current.on("roomUsers", ({ room, users }) => {
        console.log("roomUsers", room, users);
      });
    } else {
      socket.current.emit("disconnect-room");
    }
  };

  const changeNickname = async (nickname) => {
    try {
      const data = await toast.promise(
        axios.put(`${changeNicknameRoute}/${currentUserId}`, {
          nickname,
        }),
        {
          pending: "Promise is pending",
          success: "Promise resolved 👌",
          error: "Promise rejected 🤯",
        }
      );
      if (data.status === 200) {
        setCurrentNickname(data.data.nickname);
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.data)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  const createGroup = async (groupname) => {
    try {
      const data = await toast.promise(
        axios.post(`${createGroupRoute}`, {
          chatName: groupname,
          users: [currentUserId],
        }),
        {
          pending: "Promise is pending",
          success: "Promise resolved 👌",
          error: "Promise rejected 🤯",
        }
      );
      if (data.status === 200) {
        console.log("Create group successfully");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  function changeNickNamePopup() {
    var x;
    var nickname = prompt("Please enter your new nick name");
    if (nickname != null) {
      // click OK button
      changeNickname(nickname);
      x = "Hello " + nickname + "! We are already change your nickname !";
      alert(x);
    } else {
      // click Cancel button
      x = "Change your nickname next time ! bye !";
      alert(x);
    }
  }
  function createGroupPopup() {
    var x;
    var groupname = prompt(
      "Please enter group's name that you want to create or group's name that you want to join"
    );
    if (groupname != null) {
      // click OK button
      createGroup(groupname);
      x = "Hello Group " + groupname + "! We are already create your group !";
      alert(x);
    } else {
      // click Cancel button
      x = "Create your group next time ! bye !";
      alert(x);
    }
  }

  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>J H N P</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    {
                      // if contact.avatarImage is undefined, use defaultAvatar
                      contact.avatarImage === undefined ? (
                        <img
                          src={`${defaultAvatar}`}
                          className="defaultAvatar"
                          alt=""
                        />
                      ) : (
                        <img src={`${contact.avatarImage}`} alt="" />
                      )
                    }
                  </div>
                  <div className="username">
                    <h3>{contact.nickname}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img src={`${currentUserImage}`} alt="avatar" />
            </div>
            <div className="username">
              <h2>{currentNickname}</h2>
            </div>
            <IconContext.Provider
              value={{
                color: "white",
                className: "setting-gear",
                size: "1.5rem",
              }}
            >
              <div className="box" onClick={createGroupPopup}>
                <BsPlus />
                <HiUserGroup />
              </div>
            </IconContext.Provider>
            <IconContext.Provider
              value={{
                color: "white",
                className: "setting-gear",
                size: "1.5rem",
              }}
            >
              <div className="box" onClick={changeNickNamePopup}>
                <AiTwotoneSetting />
              </div>
            </IconContext.Provider>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080425;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #eeeeee37;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #eeeeee37;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
        .defaultAvatar {
          border-radius: 50%;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f9;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 3rem;
        max-inline-size: 100%;
      }
    }

    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
