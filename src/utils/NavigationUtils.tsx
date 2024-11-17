import { CommonActions, createNavigationContainerRef, StackActions } from "@react-navigation/native";


export const navigationRef = createNavigationContainerRef()

export async function navigate(routerName:string,params?:object) {
    navigationRef.isReady()
    if(navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.navigate(routerName,params))
    }
}

export async function replace(routerName:string,params?:object) {
    navigationRef.isReady()
    if(navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.replace(routerName,params))
    }
}

export async function resetAndNavigate(routerName: string) {
    console.log('Attempting to reset and navigate to:', routerName);
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.reset({
            index: 0,
            routes: [{ name: routerName }]
        }));
        console.log('Navigated to:', routerName);
    } else {
        console.error('Navigation ref is not ready!');
    }
}


export async function goBack() {
    navigationRef.isReady()
    if(navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.goBack())
    }
}

export async function push(routeName: string, params?: object) {
    navigationRef.isReady()
    if(navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.push(routeName,params))
    }
}

export async function prepareNavigation() {
    navigationRef.isReady()
    
}


