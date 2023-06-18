cube(`F_Orders`, {
  sql: `SELECT * FROM tpch.orders
  where O_ORDERSTATUS='F'
	LIMIT 25
  `,

  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },

  joins: {

  },

  measures: {
    count: {
		sql: 'O_CUSTKEY',
      type: `count`,
    },

    price: {
      sql: `${CUBE}.\`O_TOTALPRICE\``,
      type: `sum`
    },


   percent: {
	      sql: `100.0 * ${ price} / ${count}`,
	      type: `number`,
	      format: `percent`
    },

  },

  dimensions: {
    O_ORDERSTATUS: {
      sql: `${CUBE}.\`O_ORDERSTATUS\``,
      type: `string`
    },

	    O_ORDERDATE: {
	      sql: `${CUBE}.\`O_ORDERDATE\``,
	      type: `time`
    },

    oOrderpriority: {
      sql: `${CUBE}.\`O_ORDERPRIORITY\``,
      type: `string`
    },

    oClerk: {
      sql: `${CUBE}.\`O_CLERK\``,
      type: `string`
    },

    oComment: {
      sql: `${CUBE}.\`O_COMMENT\``,
      type: `string`
    },

          oOrderkey: {
	        sql: `${CUBE}.\`O_ORDERKEY\``,
	        type: `number`
	      },

	      O_CUSTKEY: {
	        sql: `${CUBE}.\`O_CUSTKEY\``,
	        type: `number`,
	        primaryKey: true,
      }
  },


  dataSource: `default`
});
