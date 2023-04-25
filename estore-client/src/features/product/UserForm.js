import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
// import ProductService from '../../services/ProductService';
import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
    username: yup.string().required(),
    city: yup.string().required(),
    mobile: yup
        .string()
        .required()
        .matches(/^[0-9]{10}$/, "Mobile Must be 10 Digit"),
    email: yup
        .string()
        .required()
        .matches( "Enter valid Email Address"),
    file: yup.string().required(),
    terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
});

const UserForm = () => {

    // const handleImageChange = (e) => {
    //     // console.log(e);

    //     const file = e.target.files[0];
    //     setProduct({ ...product, image: file });
    //     //convert image to base64
    //     const reader = new FileReader();

    //     reader.addEventListener(
    //         "load",
    //         () => {
    //             //convert image file to base64 string
    //             setPreviewImage(reader.result);
    //         },
    //         false
    //     );
    //     if (file) {
    //         reader.readAsDataURL(file);
    //     }
    // };
    return (
        <Formik
            validationSchema={schema}
            onSubmit={console.log}
            initialValues={{
                username: '',
                mobile: '',
                city: '',
                email: '',
                photo: '',
            }}
        >
            {({
                handleSubmit,
                handleChange,
                values,
                touched,
                errors,
            }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3 d-block p-5 m-5" >
                        <Form.Group as={Col} md={6} controlId="validationFormikUsername">
                            <Form.Label>Username</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    aria-describedby="inputGroupPrepend"
                                    name="username"
                                    value={values.username}
                                    onChange={handleChange}
                                    isInvalid={!!errors.username}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.username}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md={6} controlId="validationFormik03">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="City"
                                name="city"
                                value={values.city}
                                onChange={handleChange}
                                isInvalid={!!errors.city}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.city}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={6} controlId="validationFormik04">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={6} controlId="validationFormik05">
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Mobile"
                                name="mobile"
                                value={values.mobile}
                                onChange={handleChange}
                                isInvalid={!!errors.mobile}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.mobile}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={6} controlId="validationFormik05">
                            <Form.Label>File</Form.Label>
                            <Form.Control
                                type="file"
                                placeholder="file"
                                name="file"
                                value={values.mobile}
                                onChange={handleChange}
                                isInvalid={!!errors.mobile}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {errors.file}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3 mt-2">
                            <Form.Check
                                required
                                name="terms"
                                label="Agree to terms and conditions"
                                onChange={handleChange}
                                isInvalid={!!errors.terms}
                                feedback={errors.terms}
                                feedbackType="invalid"
                                id="validationFormik0"
                            />
                            <Button className="mt-3 m-0" type="submit" >Submit form</Button>
                        </Form.Group>
                    </Row>
                </Form>
            )}
        </Formik>
    );
}

export default UserForm;