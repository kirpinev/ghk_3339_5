import { ButtonMobile } from "@alfalab/core-components/button/mobile";
import { Typography } from "@alfalab/core-components/typography";
import { useState } from "react";

import alfa from "./assets/alfa-card.png";
import { LS, LSKeys } from "./ls";
import { appSt } from "./style.css";
import { ThxLayout } from "./thx/ThxLayout";
import { List } from "@alfalab/core-components/list";
import { Gap } from "@alfalab/core-components/gap";
import { SmartLayout } from "./smart/SmartLayout.tsx";
import { Underlay } from "@alfalab/core-components/underlay";
import { StatusBadge } from "@alfalab/core-components/status-badge";
import { Link } from "@alfalab/core-components/link";
import { BottomSheet } from "@alfalab/core-components/bottom-sheet";
import { sendDataToGA } from "./utils/events.ts";

enum Product {
  Check = "AlfaCheck",
  Smart = "AlfaSmart",
}

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [selectedOption, setSelectedOption] = useState<Product | null>(null);
  const [showSmart, setShowSmart] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [detailsShown, setDetailsShown] = useState(false);

  const clickDetails = () => {
    window.gtag("event", "sub_hidden_3339_5_click");
  };

  const submit = () => {
    setLoading(true);
    sendDataToGA({
      sub_choice: selectedOption,
      sub_hidden: detailsShown ? "Yes" : "No",
    }).then(() => {
      LS.setItem(LSKeys.ShowThx, true);
      setThx(true);
      setLoading(false);
    });
  };

  const handleSelection = () => {
    if (selectedOption === Product.Smart) {
      setShowSmart(true);
    }

    if (selectedOption === Product.Check) {
      submit();
    }
  };

  const handleShowThx = () => {
    setThx(true);
  };

  if (thxShow) {
    return <ThxLayout />;
  }

  if (showSmart) {
    return (
      <SmartLayout
        handleShowThx={handleShowThx}
        selectedOption={selectedOption}
        detailsShown={detailsShown}
      />
    );
  }

  return (
    <>
      <div className={appSt.container}>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "1.5rem" }}
        >
          <img
            alt="Картинка карты"
            src={alfa}
            height={48}
            style={{ objectFit: "contain" }}
          />
          <Typography.Text
            style={{ maxWidth: "230px", marginLeft: "18px" }}
            view="primary-medium"
          >
            Альфа-карта
          </Typography.Text>
        </div>

        <Typography.TitleResponsive
          style={{ marginTop: "1.5rem", marginBottom: "0.5rem" }}
          tag="h3"
          view="xsmall"
          font="system"
          weight="semibold"
        >
          Способ уведомлений
        </Typography.TitleResponsive>

        <Underlay
          style={{ flexDirection: "column" }}
          onClick={() => setSelectedOption(Product.Check)}
          backgroundColor="secondary"
          padding={{
            top: "m",
            right: "m",
            bottom: "m",
            left: "m",
          }}
          borderRadius="xl"
          contentProps={{
            axis: "vertical",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
            className={appSt.radioTextContainer}
          >
            <Typography.Text
              tag="p"
              view="primary-medium"
              defaultMargins={false}
            >
              Альфа Чек
            </Typography.Text>
            {selectedOption === Product.Check && (
              <StatusBadge view="positive-checkmark" size={24} />
            )}
          </div>
          <Gap size={12} />
          <Typography.Text tag="p" view="primary-small" defaultMargins={false}>
            <Typography.Text
              tag="span"
              view="primary-large"
              weight="bold"
              style={{ display: "inline-block", marginBottom: 0 }}
            >
              +
            </Typography.Text>{" "}
            Пуш-уведомления и смс
          </Typography.Text>
          <div className={appSt.radioTextContainer}>
            <Gap size={16} />
            <Typography.Text
              tag="p"
              view="primary-medium"
              weight="bold"
              defaultMargins={false}
            >
              99 руб/мес
            </Typography.Text>
          </div>
        </Underlay>
        <Underlay
          style={{ flexDirection: "column" }}
          onClick={() => setSelectedOption(Product.Smart)}
          dimensions={{ height: "auto", width: "100%" }}
          backgroundColor="secondary"
          padding={{
            top: "m",
            right: "m",
            bottom: "m",
            left: "m",
          }}
          borderRadius="xl"
          contentProps={{
            axis: "vertical",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
            className={appSt.radioTextContainer}
          >
            <Typography.Text
              tag="p"
              view="primary-medium"
              defaultMargins={false}
            >
              Альфа Смарт
            </Typography.Text>
            {selectedOption === Product.Smart && (
              <StatusBadge view="positive-checkmark" size={24} />
            )}
          </div>
          <Gap size={12} />
          <div style={{ margin: "0 auto" }}>
            <Underlay
              borderRadius="m"
              padding={{
                top: "2xs",
                right: "s",
                bottom: "2xs",
                left: "s",
              }}
              backgroundColor="white"
              dimensions={{ height: "auto", width: "auto" }}
              contentProps={{
                backgroundColor: "primary",
                justifyContent: "center",
              }}
            >
              <Typography.Text
                tag="p"
                view="primary-small"
                defaultMargins={false}
              >
                Включает Альфа-Чек за 0 руб. плюс
              </Typography.Text>
            </Underlay>
          </div>
          <Typography.Text
            tag="p"
            view="primary-small"
            defaultMargins={false}
            style={{ marginTop: "5px" }}
          >
            <Typography.Text
              tag="span"
              view="primary-large"
              weight="bold"
              style={{ display: "inline-block", marginBottom: 0 }}
            >
              +
            </Typography.Text>{" "}
            Больше кэшбэка
          </Typography.Text>
          <Typography.Text
            tag="p"
            view="primary-small"
            defaultMargins={false}
            style={{ marginTop: "5px" }}
          >
            <Typography.Text
              tag="span"
              view="primary-large"
              weight="bold"
              style={{ display: "inline-block", marginBottom: 0 }}
            >
              +
            </Typography.Text>{" "}
            Бесплатные переводы
          </Typography.Text>
          <Typography.Text
            tag="p"
            view="primary-small"
            defaultMargins={false}
            style={{ marginTop: "5px" }}
          >
            <Typography.Text
              tag="span"
              view="primary-large"
              weight="bold"
              style={{ display: "inline-block", marginBottom: 0 }}
            >
              +
            </Typography.Text>{" "}
            1% по накопительному счету
          </Typography.Text>
          <Gap size={16} />
          <div className={appSt.radioTextContainer}>
            <Typography.Text
              tag="p"
              view="primary-medium"
              weight="bold"
              defaultMargins={false}
            >
              299 руб/мес
            </Typography.Text>
          </div>
          <Gap size={8} />
          <Typography.Text view="primary-small">
            <Link
              pseudo={true}
              view="secondary"
              onClick={(e) => {
                e.stopPropagation();
                clickDetails();
                setDetailsShown(true);
                setExpanded(!expanded);
              }}
            >
              Все привилегии
            </Link>
          </Typography.Text>
          <div onClick={(e) => e.stopPropagation()}>
            <BottomSheet
              title={
                <Typography.TitleResponsive
                  tag="h3"
                  view="xsmall"
                  font="system"
                  weight="semibold"
                >
                  Что входит в подписку
                </Typography.TitleResponsive>
              }
              open={expanded}
              onClose={() => setExpanded(false)}
            >
              <List tag="ul" marker="•">
                <List.Item>+1 топовая категория кэшбэка</List.Item>
                <List.Item>+1 попытка крутить барабан суперкэшбэка</List.Item>
                <List.Item>Секретная подборка партнёров с кэшбэков</List.Item>
                <List.Item>Увеличенный лимит кэшбэка</List.Item>
                <List.Item>+1% годовых</List.Item>
                <List.Item>Бесплатные уведомления</List.Item>
                <List.Item>Бесплатные переводы</List.Item>
                <List.Item>Бесплатное снятие наличных</List.Item>
                <List.Item>Скидка 20% на комиссию на бирже</List.Item>
              </List>
            </BottomSheet>
          </div>
        </Underlay>
      </div>

      <Gap size="7xl" />

      <div className={appSt.bottomBtn}>
        <ButtonMobile
          loading={loading}
          block
          view="primary"
          onClick={handleSelection}
          disabled={!selectedOption}
        >
          Подключить
        </ButtonMobile>
      </div>
    </>
  );
};
