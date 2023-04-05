import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Helmet } from "react-helmet-async";
import Tooltip from "@mui/material/Tooltip";
import { Box } from "@material-ui/core";
import { Replay, Close } from '@material-ui/icons';
import { withTranslation } from "react-i18next";
import MuiTypography from "../MUITypography";
import {
    Card, CardContent, Grid, Typography, CardMedia, CardHeader,
    CardActionArea, Dialog, DialogContent, DialogTitle, Stack
} from '@mui/material';
import useMobile from "../../utils/useMobile";
import helpng from "../../assets/images/question.png";

function PageTitle(props) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [openModal, setOpenModal] = useState({ status: false, data: {} });
  const [height, setHeight] = useState();
  const ratio = 16 / 9;
  const {
    pageTitleStyle,
    mediaQuery,
    pageTitleBackground,
    titleHeading,
    name = null,
    icon: Icon,
    iconclass,
    RightComponent = null,
    mobileRightComponent,
    title = "",
    titleDescription = "",
    titleClass = "text-theme-blue text-max-width",
    t,
    showTitleInfo,
  } = props;
  const isMobile = useMobile(true);

  // Check if the title matches any of the specific ones, and only show the image if it does
  const showImage = ["Data & Settings", "Operations", "Outlets", "Business Performance", "Replenishment"].includes(titleHeading);

 const card =  [
    { title: "New Features", subTitle: "Let us guide you through everything new in our most recent Playbook release!", url: 'https://coolrgroup.tourial.com/5df412f2-7667-48d6-8599-ccec9a3a4192', },
    { title: "Playbook Overview", subTitle: "Let us guide you through our data hub - Playbook!", url: "https://coolrgroup.tourial.com/71309683-3997-452a-8bf2-67c706f6a11f" },
    { title: "Data & Settings", subTitle: "Data & Settings", url: "https://coolrgroup.tourial.com/ddd14085-4dee-46e2-8d0d-0573c9304ffa", },
    { title: "Operations", subTitle: "Operations", url: "https://coolrgroup.tourial.com/59ad4e7d-d254-4c0d-a861-6803cee53816", },
    { title: "Outlets", subTitle: "Outlets", url: "https://coolrgroup.tourial.com/546817a2-ab3b-4651-acad-c70fa1a0dddd", },
    { title: "Business Performance", subTitle: "Business Performance", url: "https://coolrgroup.tourial.com/870cce3b-2642-4358-96c7-85043d2996ee", },
    { title: "Replenishment", subTitle: "Replenishment", url: "https://coolrgroup.tourial.com/68625e21-69d7-47cb-9f6e-e55afbd49bbd", }
]

let zoom = ((window.outerWidth - 10) / window.innerWidth) * 100;

    const updateHeight = () => {
        let widthPercentage = document.getElementById('tutorial-iframe')
        if (widthPercentage) {
            widthPercentage = widthPercentage.offsetWidth;
            widthPercentage = (widthPercentage / window.innerWidth);
        } else {
            widthPercentage = 0.90
        }
        setHeight(window.innerWidth * widthPercentage * (1 / (ratio)))
    }

function handleCardClick(data) {
    const obj = card.find((item) => item.title === data);
    setOpenModal({ status: true, data: obj });
    console.log(obj);
  }
  

function handleRedirect(url) {
    if (url)
        window.open(url, '_blank', 'noopener,noreferrer');
}

function resetIframe() {
    const iframe = document.getElementById('tutorial-iframe');
    iframe.src = openModal?.data?.url;
}


useEffect(() => {
    if (openModal.status) {
        setTimeout(updateHeight, 500)
    }
}, [openModal, zoom])


  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <MuiTypography className="print-only" text={titleHeading} />
      <div
        className={
          !showTitleInfo ? clsx(pageTitleStyle, pageTitleBackground) : ""
        }
      >
        {/* Icon render */}
        {Icon && (
          <Box>
            <Icon
              iconclass={iconclass || "cameraIconTitle"}
              className={iconclass || "cameraIconTitle"}
            />
          </Box>
        )}
        {/* Title render */}
        <Box className="app-page-title--first">
          {mediaQuery ? (
            <div
              className={`app-page-title--heading-media ${
                isMobile ? "small-text pl-2" : ""
              }`}
            >
              <h1
                className={`${titleClass}  ${
                  isMobile ? "display-4 pl-2" : ""
                } `}
              >
                {t(titleHeading)}
              </h1>
            </div>
          ) : (
            <div className={`${titleDescription ? "mt-2" : ""}`}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ flex: "1 0 auto" }}>
                  {showTitleInfo ? (
                    showTitleInfo
                  ) : (
                    <MuiTypography
                      className={`${titleClass} page-text-title`}
                      variant="p"
                      text={titleHeading}
                      name={name}
                    />
                  )}
                  {titleDescription && (
                    <MuiTypography
                      className={`${titleClass} page-text-description`}
                      variant="p"
                      component="p"
                      text={titleDescription}
                    />
                  )}
                </div>
                {/* Only show the image if the title matches */}
                {/* {showImage && (
                  <Tooltip title="Help" open={showTooltip}>
                    <img
                      src={helpng}
                      alt="help"
                      style={{
                        width: "50px",
                        height: "50px",
                        marginLeft: "10px",
                      }}
                      onClick={() => { handleCardClick(titleHeading)}}
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    />
                  </Tooltip>
                )} */}
              </div>
            </div>
          )}
        </Box>
        {/* For Mobile */}
        {!isMobile && (
          <>
            <Box> {RightComponent && <RightComponent />} </Box>
            <Box> {mobileRightComponent} </Box>
          </>
        )}
      </div>

      {/* {openModal.status &&
            <Dialog fullWidth={true} maxWidth={"lg"} open={openModal.status} onClose={() => { setOpenModal({ status: false, data: {} }) }} >
                <DialogTitle className='pt-2 pb-0'>
                    <Grid container spacing={1}>
                        <Grid item className="" xs={11} sm={11} md={11} lg={11} >
                            <Typography variant="h7" component='div'> {openModal?.data?.title || ''}</Typography>
                            <Typography variant="caption" component='div'>{openModal?.data?.subTitle || ''}</Typography>
                        </Grid>
                        <Grid item className="text-right" xs={1} sm={1} md={1} lg={1} >
                            <Replay className='cursor_pointer mt-2 mr-2' onClick={resetIframe} />
                            <Close className='cursor_pointer mt-2' onClick={() => { setOpenModal({ status: false, data: {} }) }} />
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent dividers>
                    {openModal?.data?.url && <iframe
                        id='tutorial-iframe'
                        style={{ width: '100%', height: `${height}px` }}
                        title={openModal?.data?.title || ''}
                        src={openModal?.data?.url}
                        allowfullscreen
                        frameborder="0"
                    />}
                </DialogContent>
            </Dialog>} */}
    </>
  );
}

export default withTranslation()(PageTitle);
