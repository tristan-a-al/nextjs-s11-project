import { useEffect, useRef, useState } from "react";
import Notification from "../ui/notification";
import classes from "./contact-form.module.css";

const REQUEST_ERROR = "error";
const REQUEST_PENDING = "pending";
const REQUEST_SUCCESS = "success";

function ContactForm() {
  const iRefEmail = useRef();
  const iRefName = useRef();
  const iRefMessage = useRef();
  const [requestStatus, setRequestStatus] = useState(); // pending, success, error
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestStatus === REQUEST_SUCCESS || requestStatus === REQUEST_ERROR) {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function sendContactData(enteredEmail, enteredName, enteredMessage) {
    return await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async function sendMessageHandler(event) {
    event.preventDefault();

    const enteredEmail = iRefEmail.current.value;
    const enteredName = iRefName.current.value;
    const enteredMessage = iRefMessage.current.value;

    setRequestStatus(REQUEST_PENDING);

    try {
      const response = await sendContactData(
        enteredEmail,
        enteredName,
        enteredMessage
      );
      setRequestStatus(REQUEST_SUCCESS);
    } catch (e) {
      setRequestError(e.message);
      setRequestStatus(REQUEST_ERROR);
    }

    // const data = await response.json();

    // if (!response.ok) {
    //   throw new Error(data.message || "Something went wrong!");
    // }
  }

  let notification;

  if (requestStatus === REQUEST_PENDING) {
    notification = {
      status: REQUEST_PENDING,
      title: "Sending message...",
      message: "Your message is on its way!",
    };
  }

  if (requestStatus === REQUEST_SUCCESS) {
    notification = {
      status: REQUEST_SUCCESS,
      title: "Success!",
      message: "Message sent successfully!",
    };
  }

  if (requestStatus === REQUEST_ERROR) {
    notification = {
      status: REQUEST_ERROR,
      title: "Error!",
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How Can I Help You?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={iRefEmail}></input>
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" required ref={iRefName}></input>
          </div>
          <div className={classes.control}>
            <label htmlFor="message">Your Message</label>
            <textarea id="message" ref={iRefMessage}></textarea>
          </div>
          <div className={classes.actions}>
            <button>Send Message</button>
          </div>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default ContactForm;
