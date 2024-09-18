variable "content_security_policy" {
  type        = string
  description = "Content Security Policy header"
  default     = "frame-ancestors bank.nicholasmeyers.be; default-src 'none'; img-src 'self'; script-src 'self' 'unsafe-inline'; script-src-elem 'self'; style-src 'self' 'unsafe-inline'; object-src 'none'; font-src 'self' fonts.gstatic.com; connect-src 'self' keycloak.meyersnicholas.be bank-api.app-meyers.be; base-uri 'self'; manifest-src 'self'; form-action 'self'; frame-src 'self' keycloak.meyersnicholas.be; worker-src 'self'"
}

variable "permission_policy" {
  type        = string
  description = "Permission Policy header"
  default     = "accelerometer=(),autoplay=(),camera=(),encrypted-media=(),fullscreen=*,geolocation=(),gyroscope=(),magnetometer=(),microphone=(),midi=(),payment=(),sync-xhr=(),usb=(),xr-spatial-tracking=()"
}
