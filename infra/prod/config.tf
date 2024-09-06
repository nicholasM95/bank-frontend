terraform {
  required_providers {

    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "4.41.0"
    }

    aws = {
      source  = "hashicorp/aws"
      version = "5.65.0"
    }
  }

  backend "s3" {
    bucket = "nicholasmeyers-bank-frontend-prd-terraform-state"
    key    = "terraform.tfstate"
    region = "eu-west-1"
  }
}
