interface ControlMethodWrapper {
  control;
  validator?;
  noAuth?;
  multipart?;
  restMethod: string;
  param?;
}

export interface RouteMethodWrapper {
  route: string;
  methods: ControlMethodWrapper[];
}
