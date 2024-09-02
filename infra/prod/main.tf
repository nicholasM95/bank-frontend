module "static_website" {
  source                  = "git::https://github.com/nicholasM95/terraform-modules.git//modules/static-website?ref=v1.4.0-SNAPSHOT.4"
  domain_name             = "nicholasmeyers.be"
  sub_domain_name         = "bank"
  project_name            = "bank-nicholasmeyers-be"
  website_host            = "bank.nicholasmeyers.be"
  website_path            = "../../dist/bank-frontend/browser"
  content_security_policy = var.content_security_policy
  permission_policy       = var.permission_policy
}
