import React, { Component } from 'react'
import { Map, View } from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON';
import OSM from 'ol/source/OSM';
import Style from 'ol/style/Style'
import Stroke from 'ol/style/Stroke'
import Fill from 'ol/style/Fill'
import VectorLayer from 'ol/layer/Vector'
import 'antd/dist/antd.css';
import 'openlayers/css/ol.css'
import { connect } from 'react-redux';
import { Select } from 'antd';
import fetchCitiesAction, { fetchtWeather } from '../selectors/citiesSelector'
import { handelChange, updateHeight, openModalAction, closeModalAction } from '../actions/actions'
import Grid from '@material-ui/core/Grid';
import Modal from 'react-modal';
import './weather.scss'

const { Option } = Select;
let style = new Style({
  stroke: new Stroke({
    color: '#f00',
    width: 1
  }),
  fill: new Fill({
    color: 'rgba(255,0,0,0.1)'
  })

});
let vectorSource = new VectorSource({});
let map;
class Weather extends Component {
  constructor(props) {
    super(props)
    this.changJsonToFeaturLayer = this.changJsonToFeaturLayer.bind(this);
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  changJsonToFeaturLayer = (jsonFeature, cb) => {
    var geojsonFormat = new GeoJSON({ dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' });
    var features = geojsonFormat.readFeatures(jsonFeature);
    cb(features)

  }
  componentDidMount() {
    map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        new VectorLayer({
          source: vectorSource,
          style: style
        })


      ],
      view: new View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 4
      })
    })
  }
  closeModal() {
    this.props.closeModal()
  }
  openModal() {
    this.props.openModal()

  }

  handleSearch = query => {
    this.props.fetchCities(query)
  }
  handleChange = value => {
    this.props.handelChange(value)
    this.changJsonToFeaturLayer(this.props.data[value],
      (feature) => {
        vectorSource.addFeature(feature[0])
        const extent = feature[0].getGeometry().getExtent()
        map.getView().fit(extent);
        this.props.getWeather(feature[0].values_.NAME.toLowerCase())
        map.on('click', (e) => {
          console.log(this.props.weather)
          this.openModal()
        })

      })


  }

  render() {
    const style = {
      width: '100%',
      backgroundColor: '#777B7E',
      height: "100%",
      position: 'fixed',
    }
    return (
      <Grid item xs={12}>
        <div id="map" style={style}>
          <Select
            size="large"
            showSearch
            style={{ width: 200 }}
            placeholder="Select a city"
            optionFilterProp="children"
            onChange={this.handleChange}
            onSearch={this.handleSearch}
            autoClearSearchValue
          >
            {this.props.data.slice(0, 50).map((item, index) => (<Option key={index}>{item.properties.NAME}</Option>))}
          </Select>

          <Modal

            className="previewWeather"
            closeTimeoutMS={200}
            isOpen={this.props.modalIsOpen}
            onRequestClose={this.closeModal}

          >
            <div className="modal__title">
              <h3 className="modal__title__h3">Weather Status</h3>

            </div>

            <div className="modal__body">

              <div className="modal__lable">
                <label> Temperature: </label> <span> </span>
                {this.props.weather.temperature} dgree</div>

              <div className="modal__lable">
                <label> Wind Speed:</label> <span> </span>
                {this.props.weather.wind_speed} mph</div>

              <div className="modal__lable">
                <label> Pressure:</label> <span> </span>
                {this.props.weather.pressure} mb </div>
              <div className="modal__lable">
                <label> Descriptions:</label> <span> </span>
                {/* {this.props.weather.weather_descriptions[0]}  */}
              </div>

            </div>
            <div className="modal-footer">
              <button onClick={this.closeModal} className="btn btn-secondary">Close</button>
            </div>
          </Modal>


        </div>
      </Grid>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchCities: (query) => {
      dispatch(fetchCitiesAction(query))
    },
    handelChange: (value) => {
      dispatch(handelChange(value))

    },
    updateHeight: (h) => {
      dispatch(updateHeight(h))
    },
    getWeather: (name) => {
      dispatch(fetchtWeather(name))
    },
    closeModal: () => {
      dispatch(closeModalAction())
    },
    openModal: () => {
      dispatch(openModalAction())
    }
  };
};
const mapStateToProps = state => ({
  data: state.data,
  selectedFeature: state.selectedFeature,
  height: state.height,
  weather: state.weather,
  modalIsOpen: state.modalIsOpen

})

export default connect(mapStateToProps, mapDispatchToProps)(Weather) 