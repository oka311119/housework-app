export function MessageBox({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function ErrorMessageBox() {
  return <MessageBox>error</MessageBox>;
}
