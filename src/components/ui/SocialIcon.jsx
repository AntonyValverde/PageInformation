import { FaGithub, FaLinkedinIn, FaInstagram, FaFacebookF } from "./icons";

const icons = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  facebook: FaFacebookF,
};

export function SocialIcon({ id, ...props }) {
  const Icon = icons[id];
  return Icon ? <Icon aria-hidden="true" {...props} /> : null;
}
