export default function OgImage({ title }: { title: string }) {
  return (
    <div
      style={{
        padding: "64px",
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        position: "relative",
      }}
    >
      <div
        style={{
          fontSize: "64px",
          textAlign: "center",
          color: "#09090B",
          fontFamily: '"Inter SemiBold"',
        }}
      >
        {title}
      </div>
      <p
        style={{
          position: "absolute",
          bottom: "36px",
          left: "64px",
          fontSize: "32px",
          color: "#71717A",
        }}
      >
        rohid.dev
      </p>
    </div>
  );
}
