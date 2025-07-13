import {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Text,
    Link,
    Img,
} from "@react-email/components";
import { APP_ADMIN_EMAIL } from "@willo/lib";

interface BookDeliveryEmailProps {
    customerName: string;
    productName: string;
    downloadUrl: string;
}

const LOGO_URL = "https://willoapp.vercel.app/logos/logo.png";

export const DeliveryEmail = ({
    customerName,
    productName,
    downloadUrl,
}: BookDeliveryEmailProps) => (
    <Html>
        <Head />
        <Preview>Your digital purchase is ready – {productName}</Preview>
        <Body
            style={{
                fontFamily: "sans-serif",
                backgroundColor: "#f9f9f9",
                padding: "24px",
            }}
        >
            <Container
                style={{
                    padding: "24px",
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    maxWidth: "600px",
                    margin: "0 auto",
                }}
            >
                {/* Logo */}
                <Img
                    src={LOGO_URL}
                    alt="RW Logo"
                    width="120"
                    height="auto"
                    style={{ marginBottom: "24px" }}
                />

                <Text
                    style={{
                        fontSize: "16px",
                        lineHeight: "1.6",
                        marginBottom: "16px",
                    }}
                >
                    Hi {customerName},
                </Text>

                <Text
                    style={{
                        fontSize: "16px",
                        lineHeight: "1.6",
                        marginBottom: "16px",
                    }}
                >
                    Thank you for your purchase! We’re excited to deliver your
                    digital product:
                    <strong> {productName}</strong>.
                </Text>

                <Text
                    style={{
                        fontSize: "16px",
                        lineHeight: "1.6",
                        marginBottom: "16px",
                    }}
                >
                    Your order is ready for download. To access your product,
                    simply click the button below:
                </Text>

                <Link
                    href={downloadUrl}
                    target="_blank"
                    style={{
                        display: "inline-block",
                        backgroundColor: "#2563eb",
                        color: "#ffffff",
                        padding: "12px 20px",
                        borderRadius: "6px",
                        textDecoration: "none",
                        fontWeight: 600,
                        marginBottom: "24px",
                    }}
                >
                    📦 Download {productName}
                </Link>

                <Text
                    style={{
                        fontSize: "16px",
                        lineHeight: "1.6",
                        marginBottom: "16px",
                    }}
                >
                    This download link will remain active indefinitely. We
                    recommend saving a copy to your personal device for
                    convenient access.
                </Text>

                <Text
                    style={{
                        fontSize: "16px",
                        lineHeight: "1.6",
                        marginBottom: "16px",
                    }}
                >
                    If you have any issues accessing your download, or if you
                    need further assistance, don’t hesitate to reach out to our
                    support team at{" "}
                    <Link
                        href={`mailto:${APP_ADMIN_EMAIL}`}
                        style={{ color: "#2563eb" }}
                    >
                        {APP_ADMIN_EMAIL}
                    </Link>
                    .
                </Text>

                <Text style={{ fontSize: "16px", lineHeight: "1.6" }}>
                    We truly appreciate your support. Enjoy your reading!
                </Text>

                <Text
                    style={{
                        fontSize: "16px",
                        lineHeight: "1.6",
                        marginTop: "32px",
                    }}
                >
                    Warm regards,
                    <br />
                    <strong>The RW Team</strong>
                </Text>
            </Container>
        </Body>
    </Html>
);
