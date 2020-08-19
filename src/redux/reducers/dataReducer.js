import {
	SET_SPARKS,
	SET_SPARK,
	POST_SPARK,
	BUILD_BOOZULA,
	BUILD_OKE,
	ADD_HEAT,
	REMOVE_HEAT,
	LOADING_DATA,
	SET_OKELISTS,
	SET_OKELIST,
	CHOOZ_BY_LIST,
	SET_BOOZULA,
	SET_BOOZULAS,
	EXTINGUISH_SPARK,
	ADD_CHEERS,
	REMOVE_CHEERS,
	EMPTY_BOOZULA,
	CHANGE_BOOZ_IMAGE,
	ERASE_OKE,
	ADD_SONG,
	ADD_STOKE,
	ADD_TOAST,
	SET_INFERNALS,
	SET_FUSERS,
	SEND_REQUEST,
	FETCH_REQUESTED,
	ACCEPT_REQUEST,
	REJECT_REQUEST,
	SET_SENT_REQUESTS,
	CANCEL_REQUEST,
	SILENCE_FUSER,
	UNSILENCE_FUSER,
	GET_SILENCED_LIST,
	SET_HOWLS,
	SET_HOWL,
	POST_HOWL,
	SET_FUSER_HOWLS,
	SET_FUSER,
	ERASE_HOWL,
	SET_COUNT,
	ADD_COUNT,
	SET_SPARK_ID,
	POST_SPARK_IMAGE,
	POST_SPARK_VIDEO,
	POST_SPARK_AUDIO
} from "../types";

const initialState = {
	sparks: [],
	spark: {},
	sparkID: "",
	okelists: [],
	okelist: {},
	boozulas: [],
	boozula: {},
	infernals: [],
	loading: false,
	fusers: [],
	sentrequests: [],
	sentrequest: {},
	fuserequest: {},
	fuserequests: [],
	silenced: [],
	howls: [],
	howl: {},
	fuser: {},
	count: {}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case LOADING_DATA:
			return {
				...state,
				loading: true,
			};
		case SET_SPARKS:
			return {
				...state,
				sparks: action.payload,
				loading: false,
			};
		case SET_SPARK:
			return {
				...state,
				spark: action.payload,
			};
		case SET_SPARK_ID:
			return {
				...state,
				sparkID: action.payload
			};
		case SET_COUNT:
			return {
				...state,
				count: action.payload
			};
		case ADD_COUNT:
			return {
				...state,
				count: action.payload
			}
		case SET_HOWL:
			return {
				...state,
				howl: action.payload,
			};
		case SEND_REQUEST:
			return {
				...state,
				sentrequest: action.payload,
			};
		case SET_INFERNALS:
			return {
				...state,
				infernals: action.payload,
				loading: false,
			};
		case SET_OKELISTS:
			return {
				...state,
				okelists: action.payload,
				loading: false,
			};
		case SET_OKELIST:
			return {
				...state,
				okelist: action.payload,
			};
		case SET_BOOZULAS:
			return {
				...state,
				boozulas: action.payload,
				loading: false,
			};
		case SET_BOOZULA:
			return {
				...state,
				boozula: action.payload,
			};
		case SET_SENT_REQUESTS:
			return {
				...state,
				sentrequests: action.payload,
				loading: false,
			};
		case FETCH_REQUESTED:
			return {
				...state,
				fuserequests: action.payload,
				loading: false,
			};
		case ADD_HEAT:
		case REMOVE_HEAT:
			let sparkIndex = state.sparks.findIndex(
				(spark) => spark.sparkId === action.payload.sparkId
			);
			let infernalIndex = state.infernals.findIndex(
				(infernal) => infernal.sparkId === action.payload.sparkId
			);
			state.sparks[sparkIndex] = action.payload;
			state.infernals[infernalIndex] = action.payload;
			if (state.spark.sparkId === action.payload.sparkId) {
				let temp = state.spark.stokes;
				state.spark = action.payload;
				state.spark.stokes = temp;
			}
			return {
				...state,
			};
		case SET_FUSERS:
			return {
				...state,
				fusers: action.payload,
				loading: false,
			};
		case POST_SPARK:
			return {
				...state,
				sparks: [action.payload, ...state.sparks],
			};
		case POST_SPARK_IMAGE:
			return {
				...state,
				sparks: [action.payload, ...state.sparks],
			};
		case POST_SPARK_VIDEO:
			return {
				...state,
				sparks: [action.payload, ...state.sparks],
			};
			case POST_SPARK_AUDIO:
			return {
				...state,
				sparks: [action.payload, ...state.sparks],
			};
		case POST_HOWL:
			return {
				...state,
				howls: [action.payload, ...state.howls],
			};
		case ADD_STOKE:
			return {
				...state,
				spark: {
					...state.spark,
					stokes: [action.payload, ...state.spark.stokes],
				},
			};
		case BUILD_BOOZULA:
			return {
				...state,
				boozulas: [action.payload, ...state.boozulas],
			};
		case ADD_TOAST:
			return {
				...state,
				boozula: {
					...state.boozula,
					toasts: [action.payload, ...state.boozula.toasts],
				},
			};
		case BUILD_OKE:
			return {
				...state,
				okelists: [action.payload, ...state.okelists],
			};
		case ADD_SONG:
			return {
				...state,
				okelist: {
					...state.okelist,
					songs: [action.payload, ...state.okelist.songs],
				},
			};
		case ADD_CHEERS:
		case REMOVE_CHEERS:
			let boozIndex = state.boozulas.findIndex(
				(boozula) => boozula.boozId === action.payload.boozId
			);
			state.boozulas[boozIndex] = action.payload;
			if (state.boozula.boozId === action.payload.boozId) {
				let temp = state.boozula.toasts;
				state.boozula = action.payload;
				state.boozula.toasts = temp;
			}
			return {
				...state,
			};
		case EXTINGUISH_SPARK:
			let exIndex = state.sparks.findIndex(
				(spark) => spark.sparkId === action.payload
			);
			state.sparks.splice(exIndex, 1);
			return {
				...state,
			};
		case EMPTY_BOOZULA:
			let emptyIndex = state.boozulas.findIndex(
				(boozula) => boozula.boozId === action.payload
			);
			state.boozulas.splice(emptyIndex, 1);
			return {
				...state,
			};
		case CHANGE_BOOZ_IMAGE:
			let imgIndex = state.boozulas.findIndex(
				(boozula) => boozula.boozId === action.payload.boozId
			);
			state.boozulas[imgIndex] = action.payload;
			return {
				...state,
			};
		case ERASE_OKE:
			let eraseIndex = state.okelists.findIndex(
				(okelist) => okelist.okeId === action.payload
			);
			state.okelists.splice(eraseIndex, 1);
			return {
				...state,
			};
		case ERASE_HOWL:
			let howlIndex = state.howls.findIndex(
				(howl) => howl.howlId === action.payload
			);
			state.howls.splice(howlIndex, 1);
			return {
				...state,
			};
		case CHOOZ_BY_LIST:
			let songIndex = state.okelists.findIndex(
				(okelist) => okelist.okeId === action.payload.okeId
			);
			state.okelists[songIndex] = action.payload;
			return {
				...state,
			};
		case ACCEPT_REQUEST:
			let reqIndex = state.fuserequests.findIndex(
				(request) => request.reqId === action.payload.reqId
			);
			state.fuserequests[reqIndex] = action.payload;
			return {
				...state,
			};
		case REJECT_REQUEST:
			let rejIndex = state.fuserequests.findIndex(
				(request) => request.reqId === action.payload.reqId
			);
			state.fuserequests[rejIndex] = action.payload;
			return {
				...state,
			};
		case CANCEL_REQUEST:
			let cancelIndex = state.sentrequests.findIndex(
				(request) => request.reqId === action.payload
			);
			state.sentrequests.splice(cancelIndex, 1);
			return {
				...state,
			};
		case GET_SILENCED_LIST:
			return {
				...state,
				silenced: action.payload,
				loading: false,
			};
		case SILENCE_FUSER:
			return {
				...state,
				silenced: [action.payload, ...state.silenced],
			};
		case UNSILENCE_FUSER:
			state.silenced.splice(action.payload, 1);
			return {
				...state,
			};
		case SET_HOWLS:
			return {
				...state,
				howls: action.payload,
				loading: false,
			};
		case SET_FUSER_HOWLS:
			return {
				...state,
				howls: action.payload,
				loading: false,
			};
		case SET_FUSER:
			return {
				...state,
				fuser: action.payload,
			};
		default:
			return state;
	}
}
