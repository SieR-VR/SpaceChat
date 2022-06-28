import { useEffect, useState } from "react";
import Switch from "react-switch";
import Image from "next/image";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Settings({ session }: { session: Session }) {
  const [user, setUser] = useState({ id: "", name: "", username: "" });
  const [space, setSpace] = useState({ id: "", title: "" });

  useEffect(() => {
    (async () => {
      const userinfo = await fetch("/api/twitter/userinfo", {
        method: "GET",
      });

      const userInfo = await userinfo.json();
      setUser(userInfo.user);
      setSpace(userInfo.space);
    })();
  }, []);

  return (
    <div className="settings-container">
      <div className="settings-header" style={{
        background: (space.title !== "") ? "" : "#AAA",
        boxShadow: (space.title !== "") ? "0px 0px 10px #6b54fb" : "none",
      }}>
        {user.name && (space.title ? (
          <div className="settings-header-title">
            {space.title}
          </div>
        ) : (
          <div className="settings-header-title">
            {`스페이스를 찾지 못했어요..`}
          </div>
        ))}
        {!user.name && (
          <div className="settings-header-title">
            {`검색중이에요...`}
          </div>
        )}
      </div>
      <div className="settings-body">
        <div className="settings-secret">
          <div className="settings-title">
            {`비밀번호`}
          </div>
          <div className="settings-secret-input">
            <input type="password" placeholder="비밀번호" />
          </div>
        </div>
        <div className="settings-rules">
          <div className="settings-title">
            {`채팅 규칙`}
          </div>
          <div className="settings-rules-item">
            <p>{`익명 유저 허용`}</p>
            <Switch onChange={() => {}} checked={true} />
          </div>
          <div className="settings-rules-item">
            <p>{`보통 어떻게 하나요`}</p>
            <Switch onChange={() => {}} checked={true} />
          </div>
          <div className="settings-rules-item">
            <p>{`잘 모르겠어요`}</p>
            <Switch onChange={() => {}} checked={true} />
          </div>
        </div>
      </div>
      <div className="settings-footer">
        <button className="settings-footer-button" onClick={async () => {
          const streamToken = await fetch('/api/user', {
            method: "POST",
            body: JSON.stringify({
              id: user.id,
            }),
          }).then(res => res.json());
          
          if (!streamToken.streamToken) {
            alert("스트림 토큰을 받아오지 못했어요. 다시 시도해주세요.");
            return;
          }

          const channel = await fetch('/api/channel', {
            method: "POST",
            body: JSON.stringify({
              id: user.id,
              spaceId: space.id,
              spaceTitle: space.title
            }),
          }).then(res => res.json());

          if (!channel.redirect) {
            alert("채널을 받아오지 못했어요. 다시 시도해주세요.");
            return;
          }

          window.location.href = channel.redirect;
        }} style={{
          background: space.title ? "" : "#AAA",
          boxShadow: space.title ? "0px 0px 10px #6b54fb" : "none",
        }} disabled={!!!space.title}>시작!</button>
        <a className="settings-footer-return" onClick={() => {
          signOut();
        }}>처음으로 돌아갈래요..</a>
      </div>
    </div>
  )
}
