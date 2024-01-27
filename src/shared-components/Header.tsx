import LogoIcon from "@/assets/images/logo.svg";
import UserIcon from "@/assets/images/icons/user.svg";
import ArrowIcon from "@/assets/images/icons/chevron.svg";
import { ButtonNormalized } from "~/Button";
import styled from "@emotion/styled";
import { Tooltip } from "~/Tooltip";
import React from "react";
import LogoutIcon from "@/assets/images/icons/logout.svg";
import SettingsIcon from "@/assets/images/icons/user-settings.svg";
import { css } from "@emotion/react";
import { Modal } from "./Modal";
import { UserSettings } from "./UserSettings";
import { accountType, initialData, useUser } from "@/modules/user";
import { customFetch } from "@/modules/fetch";
import { formatPhoneNumber } from "@/modules/utils/formatPhoneNumber";

export const Header = () => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const { state, setUser } = useUser();

  const accountType = getAccountType(state.accountType);

  const logout = () => {
    customFetch(`/auth/logout`, {
      method: "POST",
      body: { refreshToken: state.refreshToken } as any,
    });

    localStorage.removeItem("userData");
    setUser(initialData);
  };

  return (
    <HeaderWrapper>
      <LogoIcon width={80} height={26} />
      {state.accessToken && (
        <>
          <Info>
            <Icon>
              <UserIcon width={20} height={20} />
            </Icon>

            <Tooltip
              content={
                <>
                  <Row>
                    <Icon>
                      <UserIcon width={20} height={20} />
                    </Icon>
                    <Col>
                      <Name>{state.name}</Name>
                      <Role>{accountType}</Role>
                    </Col>
                  </Row>
                  <Row className="footer">
                    <Mail>{state.email}</Mail>
                    <Phone>{formatPhoneNumber(state.phone)}</Phone>
                  </Row>
                </>
              }
              placement="bottom-end"
              className="user-info-tooltip"
            >
              {() => <Name className="name">{state.name}</Name>}
            </Tooltip>

            <Tooltip
              content={
                <>
                  <MenuDash />

                  <Tooltip
                    content="Настройки профиля"
                    placement="top-end"
                    className="menu-icon"
                    withArrow
                  >
                    {() => (
                      <MenuIcon onClick={() => setIsOpenModal(true)}>
                        <SettingsIcon width={24} height={24} />
                      </MenuIcon>
                    )}
                  </Tooltip>

                  <Tooltip
                    content="Выйти из аккаунта"
                    placement="top-end"
                    className="menu-icon"
                    withArrow
                  >
                    {() => (
                      <MenuIcon onClick={logout}>
                        <LogoutIcon width={24} height={24} />
                      </MenuIcon>
                    )}
                  </Tooltip>
                </>
              }
              offset={[0, 0]}
              activeMode="click"
              className="menu-tooltip"
            >
              {(isOpen) => (
                <Button isOpen={isOpen}>
                  <ArrowIcon width={24} height={24} />
                </Button>
              )}
            </Tooltip>
          </Info>
          <Modal isVisible={isOpenModal} onRequestClose={setIsOpenModal}>
            <UserSettings />
          </Modal>
        </>
      )}
    </HeaderWrapper>
  );
};

const getAccountType = (accountType: accountType) => {
  switch (accountType) {
    case "account_type_broker":
      return "Частный брокер";
    case "account_type_company":
      return "Компания";
    default:
      return "Собственник";
  }
};

const HeaderWrapper = styled.header`
  padding: 16px 30px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: sticky;
  left: 0;
  right: 0;
  top: 0;
  z-index: 3;

  background-color: #141414;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.15);
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  .user-info-tooltip {
    .popper-content {
      width: 336px;
      padding: 16px;
      border-radius: 16px;
      background: #1f1f1f;
    }
  }
  .menu-tooltip {
    > .popper-content {
      width: 48px;
      padding: 16px;

      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 19px;

      border-radius: 0 0 16px 16px;
      background: #1f1f1f;
    }
  }
  .menu-icon {
    white-space: nowrap;
    line-height: 0;
  }
`;
const Icon = styled.div`
  width: 44px;
  height: 44px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  border-radius: 50%;
  background-color: #414141;
  color: #fff;
`;
const MenuIcon = styled(ButtonNormalized)`
  color: #fff;
  line-height: 0;

  transition: 0.2s;

  &:hover {
    color: #ff8a25;
  }
`;
const Name = styled.div`
  color: #fff;
  font-size: 18px;

  transition: 0.2s;

  &.name {
    cursor: default;
    &:hover {
      color: #ff8a25;
    }
  }
`;
const Button = styled(ButtonNormalized)<{ isOpen: boolean }>`
  padding: 12px;
  background-color: #1f1f1f;
  color: #fff;
  line-height: 0;

  svg {
    transition: 0.2s;
  }

  transition: 0.2s;

  ${({ isOpen }) =>
    isOpen
      ? css`
          border-radius: 12px 12px 0 0;
          svg {
            transform: scaleY(-1);
          }
        `
      : css`
          border-radius: 12px;
        `}

  &:hover {
    color: #ff8a25;
  }
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  &.footer {
    margin-top: 12px;
    padding-top: 12px;

    justify-content: space-between;

    border-top: 1px solid #414141;
  }
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const Role = styled.div`
  color: #959596;
  font-size: 12px;
  line-height: 135%;
  letter-spacing: 0.72px;
  text-transform: uppercase;
`;
const Mail = styled(ButtonNormalized)`
  color: #ff8a25;
  font-size: 14px;
  line-height: 150%;
  text-decoration-line: underline;
`;
const Phone = styled(ButtonNormalized)`
  color: #fff;
  font-size: 14px;
  line-height: 150%;
`;
const MenuDash = styled.div`
  width: 20px;
  height: 1px;

  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  background: #414141;
`;
