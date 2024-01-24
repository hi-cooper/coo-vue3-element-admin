// RouteRecordRaw最终格式参考
// path： 必须

 RouteRecordRaw = 
 RouteRecordSingleView 
 | RouteRecordSingleViewWithChildren 
 | RouteRecordMultipleViews 
 | RouteRecordMultipleViewsWithChildren 
 | RouteRecordRedirect;

export declare interface _RouteRecordBase extends PathParserOptions {
    path: string;
    name?: RouteRecordName;
    alias?: string | string[];
    props?: _RouteRecordProps | Record<string, _RouteRecordProps>;
    meta?: RouteMeta;
    redirect?: RouteRecordRedirectOption;
    children?: RouteRecordRaw[];
    beforeEnter?: NavigationGuardWithThis<undefined> | NavigationGuardWithThis<undefined>[];
}

export declare interface RouteRecordSingleView  {
    components?: never;
    redirect?: never;
    children?: never;

    path: string;
    component: RawRouteComponent;

    name?: RouteRecordName;
    alias?: string | string[];
    props?: _RouteRecordProps;
    meta?: RouteMeta;
    beforeEnter?: NavigationGuardWithThis<undefined> | NavigationGuardWithThis<undefined>[];
}

export declare interface RouteRecordSingleViewWithChildren {
    components?: never;

    path: string;
    children: RouteRecordRaw[];

    name?: RouteRecordName;
    alias?: string | string[];
    props?: _RouteRecordProps;
    meta?: RouteMeta;
    component?: RawRouteComponent | null | undefined;
    redirect?: RouteRecordRedirectOption;
    beforeEnter?: NavigationGuardWithThis<undefined> | NavigationGuardWithThis<undefined>[];
}

export declare interface RouteRecordMultipleViews {
    component?: never;
    redirect?: never;
    children?: never;

    path: string;
    components: Record<string, RawRouteComponent>;

    name?: RouteRecordName;
    alias?: string | string[];
    props?: Record<string, _RouteRecordProps> | boolean;
	meta?: RouteMeta;
    beforeEnter?: NavigationGuardWithThis<undefined> | NavigationGuardWithThis<undefined>[];
}

export declare interface RouteRecordMultipleViewsWithChildren {
    component?: never;

    path: string;
    children: RouteRecordRaw[];

    name?: RouteRecordName;
    alias?: string | string[];
    props?: Record<string, _RouteRecordProps> | boolean;
	meta?: RouteMeta;
    components?: Record<string, RawRouteComponent> | null | undefined;
    redirect?: RouteRecordRedirectOption;
    beforeEnter?: NavigationGuardWithThis<undefined> | NavigationGuardWithThis<undefined>[];
}

export declare interface RouteRecordRedirect {
    component?: never;
    components?: never;
    props?: never;

    path: string;
    redirect: RouteRecordRedirectOption;

    name?: RouteRecordName;
    alias?: string | string[];
    meta?: RouteMeta;
    children?: RouteRecordRaw[];
    beforeEnter?: NavigationGuardWithThis<undefined> | NavigationGuardWithThis<undefined>[];
}