import { useState, ChangeEvent, FormEvent } from "react";
import * as emailjs from "emailjs-com";
import styles from "./Contact.module.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";

interface FormData {
  email: string;
  name: string;
  message: string;
  loading: boolean;
  show: boolean;
  alertmessage: string;
  variant: string;
}

export const ContactUs = () => {
  const { t } = useTranslation();
  const contactConfig = {
    YOUR_EMAIL: "dariofrsoares@icloud.com",
    YOUR_FONE: "+351 919792186",
    YOUR_SERVICE_ID: "service_id",
    YOUR_TEMPLATE_ID: "template_id",
    YOUR_USER_ID: "user_id",
  };

  const [formData, setFormdata] = useState<FormData>({
    email: "",
    name: "",
    message: "",
    loading: false,
    show: false,
    alertmessage: "",
    variant: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormdata({ ...formData, loading: true });

    const templateParams = {
      from_name: formData.email,
      user_name: formData.name,
      to_name: contactConfig.YOUR_EMAIL,
      message: formData.message,
    };

    emailjs
      .send(
        contactConfig.YOUR_SERVICE_ID,
        contactConfig.YOUR_TEMPLATE_ID,
        templateParams,
        contactConfig.YOUR_USER_ID
      )
      .then(
        (result) => {
          console.log(result.text);
          setFormdata({
            ...formData,
            loading: false,
            alertmessage: t('contact.successMessage'),
            variant: "success",
            show: true,
          });
        },
        (error) => {
          console.log(error.text);
          setFormdata({
            ...formData,
            alertmessage: `${t('contact.errorMessage')} ${error.text}`,
            variant: "danger",
            show: true,
          });
          document.getElementsByClassName("co_alert")[0].scrollIntoView();
        }
      );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <HelmetProvider>
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{t('contact.meta.title')}</title>
          <meta name="description" content={t('contact.meta.description')} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">{t('contact.pageTitle')}</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="12">
            <Alert
              variant={formData.variant}
              className={`rounded-0 co_alert ${
                formData.show ? "d-block" : "d-none"
              }`}
              onClose={() => setFormdata({ ...formData, show: false })}
              dismissible
            >
              <p className="my-0">{formData.alertmessage}</p>
            </Alert>
          </Col>
          <Col lg="5" className="mb-5">
            <h3 className="color_sec py-4">{t('contact.sectionTitle')}</h3>
            <address>
              <strong>{t('contact.email')}</strong>{" "}
              <a href={`mailto:${contactConfig.YOUR_EMAIL}`}>
                {contactConfig.YOUR_EMAIL}
              </a>
              <br />
              <br />
              {contactConfig.YOUR_FONE && (
                <p>
                  <strong>{t('contact.phone')}</strong> {contactConfig.YOUR_FONE}
                </p>
              )}
            </address>
            <p>{t('contact.description')}</p>
          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <form onSubmit={handleSubmit} className={`${styles.contactForm} w-100`}>
              <Row>
                <Col lg="6" className="form-group">
                  <input
                    className={`form-control ${styles.formControl}`}
                    id="name"
                    name="name"
                    placeholder={t('contact.namePlaceholder')}
                    value={formData.name || ""}
                    type="text"
                    required
                    onChange={handleChange}
                  />
                </Col>
                <Col lg="6" className="form-group">
                  <input
                    className={`form-control rounded-0 ${styles.formControl}`}
                    id="email"
                    name="email"
                    placeholder={t('contact.emailPlaceholder')}
                    type="email"
                    value={formData.email || ""}
                    required
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <textarea
                className={`form-control rounded-0 ${styles.formControl}`}
                id="message"
                name="message"
                placeholder={t('contact.messagePlaceholder')}
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <br />
              <Row>
                <Col lg="12" className="form-group">
                  <button className={`btn ac_btn ${styles.acBtn}`} type="submit">
                    {formData.loading ? t('contact.sendingButton') : t('contact.sendButton')}
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
      <div className={formData.loading ? styles.loadingBar : "d-none"}></div>
    </HelmetProvider>
  );
};
