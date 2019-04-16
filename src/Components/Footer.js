import React from 'react';
import styled from 'styled-components';
import { Fab, Tooltip } from "@material-ui/core";
import { Link } from 'react-router-dom';
import AddIcon from "@material-ui/icons/Add";
import { MaltemBrand } from './common/icons';
import Container from './common/content/Container';

const FooterContainer = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 25px 0 48px;

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .footer__content {
    display: flex;
    align-items: center;

    .footer__branding {
      margin-right: 10px;
    }

    .footer__copyright {
      font-size: 11px;
      line-height: 13px;
      letter-spacing: 0.07px;
      color: #626262;
    }
  }
`;

const Footer = () => (
  <FooterContainer className="footer">
    <Container>
      <div className="footer__content">
        <div className="footer__branding">
          <MaltemBrand />
        </div>
        <div className="footer__copyright">
          Maltem Seeker &copy; {(new Date()).getFullYear()}
        </div>
      </div>

      <Tooltip title="Add Profile">
        <Fab color="primary" component={Link} to="/add-profile" aria-label="Add Profile">
          <AddIcon />
        </Fab>
      </Tooltip>
    </Container>
  </FooterContainer>
)

export default Footer;
