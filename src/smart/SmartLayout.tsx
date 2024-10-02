import { Typography } from "@alfalab/core-components/typography";
import { smartSt } from "./style.css";
import { ButtonMobile } from "@alfalab/core-components/button/mobile";
import { FC, useCallback, useState } from "react";
import { LS, LSKeys } from "../ls";
import { sendDataToGA } from "../utils/events.ts";

interface ISmartLayoutProps {
  handleShowThx: () => void;
  selectedOption: "AlfaSmart" | "AlfaCheck" | null;
  detailsShown: boolean;
}

export const SmartLayout: FC<ISmartLayoutProps> = ({
  handleShowThx,
  selectedOption,
  detailsShown,
}) => {
  const [loading, setLoading] = useState(false);

  const clickApprove = () => {
    window.gtag("event", "alfa_smart_3339_5_approve");
  };

  const submit = useCallback(() => {
    clickApprove()
    setLoading(true);
    sendDataToGA({
      sub_choice: selectedOption,
      sub_hidden: detailsShown ? "Yes" : "No",
    }).then(() => {
      LS.setItem(LSKeys.ShowThx, true);
      setLoading(false);
      handleShowThx();
    });
  }, []);

  return (
    <div className={smartSt.container}>
      <Typography.TitleResponsive
        className={smartSt.title}
        font="system"
        tag="h1"
        view="small"
        weight="semibold"
      >
        Вы действительно хотите подключить Альфа Смарт?
      </Typography.TitleResponsive>
      <ButtonMobile view="primary" onClick={submit} loading={loading}>
        Да, подключить
      </ButtonMobile>
    </div>
  );
};
