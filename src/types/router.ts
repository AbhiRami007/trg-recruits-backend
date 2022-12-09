interface ControlMethodWrapper {
  control;
  validator?;
  noAuth?;
  multipart?;
  restMethod: string;
}

export interface RouteMethodWrapper {
  route: string;
  methods: ControlMethodWrapper[];
}
