import React, { FunctionComponent } from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import {
  InputDelivery,
  Button,
  MyForm,
  NoItemsOrder,
  ErrorMsg,
} from "../styledComponents/OrderPanel";
import { ItemTypeOrder } from "../types";

const renderError = ({ alertClass, touched, warning, error }: any) => (
  <div>
    {touched &&
      ((error && (
        <div style={{ margin: "0.5rem" }}>
          <ErrorMsg>{error}</ErrorMsg>
        </div>
      )) ||
        (warning && (
          <div style={{ margin: "0.5rem" }}>
            <ErrorMsg severity="warning">{warning}</ErrorMsg>
          </div>
        )))}
  </div>
);

const renderInput = ({ alertClass, input, placeholder, meta }: any) => {
  return (
    <>
      <InputDelivery {...input} placeholder={placeholder} />
      {renderError({ ...meta, alertClass })}
    </>
  );
};
type formProps = { itemsOrder: ItemTypeOrder[] | undefined };

const OrderForm: FunctionComponent<
  InjectedFormProps<any, formProps> & formProps
> = (props: any) => {
  const onSubmitWithReCAPTCHA = async (formValues: any) => {
    console.log({ props });
    // const token = await recaptchaRef.current.executeAsync();
    // const recaptchaResponse: any = await verifyRecaptchaToken(apiLaravel, token);
    // if (recaptchaResponse.success) {
    console.log({ formValues });
    const response = await props.onSubmit(formValues);
    console.log({ response });
    response.success && props.reset();
    // }
  };

  const renderForm = () => {
    if (props.itemsOrder && props.itemsOrder.length > 0) {
      return (
        <MyForm onSubmit={props.handleSubmit(onSubmitWithReCAPTCHA)}>
          <Field
            component={renderInput}
            placeholder="Your Name"
            type="text"
            name="name"
            required
          />

          <Field
            component={renderInput}
            placeholder="Your Contact phone"
            type="text"
            name="contact"
            required
          />
          <Field
            component={renderInput}
            placeholder="Your Delivery Address (Street, number, apartment number)"
            type="text"
            name="address"
            required
          />
          <Button onClick={props.handleSubmit(onSubmitWithReCAPTCHA)}>
            Confirm and Send
          </Button>
        </MyForm>
      );
    }
    return (
      <NoItemsOrder>
        <span>No Order to make</span>
      </NoItemsOrder>
    );
  };

  return <>{renderForm()}</>;
};

const validate = (formValues: any) => {
  const errors: any = {};
  if (!formValues.contact) {
    errors.contact = "Contact Phone is an obligatory field";
  }
  if (!formValues.name) {
    errors.name = "Name is an obligatory field";
  }
  if (!formValues.address) {
    errors.address = "Address is an obligatory field";
  }
  return errors;
};

export default reduxForm<any, formProps>({
  form: "OrderForm",
  validate,
})(OrderForm);
