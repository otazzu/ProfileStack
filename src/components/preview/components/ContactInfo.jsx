const ContactInfo = ({mainclass, linkclass, teldata, emaildata, addressdata, telicon, emailicon, addressicon, children}) => {
  return (
    <div className={mainclass}>
      {teldata && (
        <a className={linkclass}
          aria-label="Phone Number"
          href={`tel:${teldata}`}>
          {telicon} {teldata}
        </a>
      )}
      {emaildata && (
        <a className={linkclass}
          aria-label="Email Address"
          href={`mailto:${emaildata}`}>
          {emailicon} {emaildata}
        </a>
      )}
      {children}
      {addressdata && (
        <address
          aria-label="Address"
          className={linkclass + " not-italic"}>
          {addressicon} {addressdata}
        </address>
      )}
    </div>
  );
};

export default ContactInfo;
